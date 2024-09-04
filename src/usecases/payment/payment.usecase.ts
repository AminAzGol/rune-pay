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
import {AddressAssetUsecase} from "../address-asset/address-asset.usecase";
import {WalletAddressUsecase} from "../wallet-address/wallet-address.usecase";
import {TransactionUsecase} from "../transaction/transaction.usecase";


@Injectable()
export class PaymentUsecase extends BaseUsecase<PaymentRepository, PaymentM> {
    constructor(repository: PaymentRepository,
                private readonly invoiceUsecase: InvoiceUsecase,
                private readonly acquisitionUsecase: AcquisitionUsecase,
                private readonly conversionRateUsecase: ConversionRateUsecase,
                private readonly addressAssetUsecase: AddressAssetUsecase,
                private readonly walletAddressUsecase: WalletAddressUsecase,
                private readonly transactionUsecase: TransactionUsecase,
    ) {
        super(repository);
    }

    async create(input: CreatePaymentDto): Promise<PaymentM> {
        const invoice = await this.invoiceUsecase.readById(input.invoiceId)
        const conversionRate = await this.conversionRateUsecase.readByAssetIdAndCurrencyId(input.payAssetId, invoice.currencyId)
        const acquisition = await this.acquisitionUsecase.acquireWalletForPayment(input.payAssetId)
        try {
            const payment: Omit<PaymentM, keyof BaseM> = {
                payAmount: invoice.amount / conversionRate.rate,
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
    }

    async readById(id: number): Promise<PaymentWithTxs> {
        const payment = await super.readById(id);
        const acquisition = await this.acquisitionUsecase.readById(payment.acquisitionId)
        return {
            ...payment,
            acquisition
        }
    }
}