import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {PaymentRepository} from "../../infrastructure/repositories/providers/payment.repository";
import {PaymentM, PaymentWithTxs} from "../../domain/model/payment";
import {InvoiceUsecase} from "../invoice/invoice.usecase";
import {AcquisitionUsecase} from "../acquisition/acquisition.usecase";
import {CreatePaymentDto} from "../../infrastructure/controllers/payment/payment.dto";
import {ConversionRateUsecase} from "../conversion-rate/conversion-rate.usecase";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {DateUtils} from "../../infrastructure/common/utils/date.utils";
import {BaseM} from "../../domain/model/base";
import {ResourcePreconditionFailed} from "../../domain/exceptions/resource-exceptions";
import {EnvironmentConfigService} from "../../infrastructure/common/config/environment_config.service";
import {AssetUsecase} from "../asset/asset.usecase";
import {ChainUsecase} from "../chain/chain.usecase";
import {ChainEnum} from "../../domain/enum/chain.enum";
import Big from "big.js";
import {AcquisitionStateEnum} from "../../domain/enum/acquisition-state.enum";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";


@Injectable()
export class PaymentUsecase extends BaseUsecase<PaymentRepository, PaymentM> {
    constructor(repository: PaymentRepository,
                private readonly invoiceUsecase: InvoiceUsecase,
                private readonly acquisitionUsecase: AcquisitionUsecase,
                private readonly conversionRateUsecase: ConversionRateUsecase,
                private readonly environmentConfigService: EnvironmentConfigService,
                private readonly assetUsecase: AssetUsecase,
                private readonly chainUsecase: ChainUsecase
    ) {
        super(repository);
    }

    async create(input: CreatePaymentDto): Promise<PaymentM> {
        const invoice = await this.invoiceUsecase.readById(input.invoiceId)
        const conversionRate = await this.conversionRateUsecase.readByAssetIdAndCurrencyId(input.payAssetId, invoice.currencyId)
        const acquisition = await this.acquisitionUsecase.acquireWalletForPayment(input.payAssetId)
        try {
            const payment: Omit<PaymentM, keyof BaseM> = {
                payAmount: (new Big(invoice.amount)).div(conversionRate.rate).toString(),
                conversionRateId: conversionRate.id,
                status: PaymentStatusEnum.PENDING,
                expiresAt: DateUtils.getNextXHours(2),
                baseAmount: invoice.amount,
                baseCurrencyId: invoice.currencyId,
                shopId: invoice.shopId,
                payAssetId: input.payAssetId,
                invoiceId: input.invoiceId,
                acquisitionId: acquisition.id
            }
            return await this.repository.insert(payment)
        } catch (e) {
            await this.acquisitionUsecase.releaseWallet(acquisition.id)
        }
    }

    async renew(paymentId: number): Promise<PaymentM> {
        const payment = await this.repository.findById(paymentId)
        if (payment.status !== PaymentStatusEnum.EXPIRED) {
            throw new ResourcePreconditionFailed('Payment', {status: payment.status}, 'payment must be expired')
        }
        const conversionRate = await this.conversionRateUsecase.readByAssetIdAndCurrencyId(payment.payAssetId, payment.baseCurrencyId)
        const newPayment = await this.repository.insert({
            conversionRateId: conversionRate.id,
            baseCurrencyId: payment.baseCurrencyId,
            baseAmount: payment.baseAmount,
            payAssetId: payment.payAssetId,
            payAmount: payment.payAmount,
            invoiceId: payment.invoiceId,
            expiresAt: DateUtils.getNextXHours(2),
            status: PaymentStatusEnum.PENDING,
            shopId: payment.shopId,
            acquisitionId: payment.acquisitionId
        })
        return newPayment;
    }

    async updatePaymentTxs(paymentId: number): Promise<void> {
        const payment = await this.repository.findById(paymentId)
        await this.acquisitionUsecase.updateAcquisitionTransactions(payment.acquisitionId)
        const asset = await this.assetUsecase.readById(payment.payAssetId)
        const chain = await this.chainUsecase.readById(asset.chainId)
        const minConfirmations = this.environmentConfigService.getChainConfirmations(chain.name as ChainEnum)
        const paymentWithTxs = await this.readById(payment.id)
        const txs = paymentWithTxs.acquisition.txs
        if (txs.length > 0) {
            const confirmedTxs = txs.filter(tx => tx.confirmations > minConfirmations)
            if (confirmedTxs.length > 0) {
                const confirmedAmount = confirmedTxs.reduce((acc, tx) => {
                    const amount = new Big(tx.amountReceived)
                    return acc.add(amount)
                }, new Big(0))
                if (confirmedAmount.gte(new Big(payment.payAmount))) {
                    await this.repository.update(payment.id, {status: PaymentStatusEnum.PAID})
                    await this.acquisitionUsecase.update(payment.acquisitionId, {state: AcquisitionStateEnum.DONE})
                    await this.invoiceUsecase.update(payment.invoiceId, {status: InvoiceStatusEnum.PAID})
                }
            }
        }
    }

    async readById(id: number): Promise<PaymentWithTxs> {
        const payment = await super.readById(id);
        const acquisition = await this.acquisitionUsecase.readById(payment.acquisitionId)
        return {
            ...payment,
            acquisition
        }
    }

    async readByInvoiceIdAndStatus(invoiceId: number, status): Promise<PaymentWithTxs[]> {
        const result = await this.repository.findAll({invoiceId, status})
        for (const payment of result) {
            payment.acquisition = await this.acquisitionUsecase.readById(payment.acquisitionId)
        }
        return result as PaymentWithTxs[]
    }
}