import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {PaymentRepository} from "../../infrastructure/repositories/providers/payment.repository";
import {PaymentM} from "../../domain/model/payment";
import {InvoiceUsecase} from "../invoice/invoice.usecase";
import {AcquisitionUsecase} from "../acquisition/acquisition.usecase";
import {CreatePaymentDto} from "../../infrastructure/controllers/payment/payment.dto";
import {ConversionRateUsecase} from "../conversion-rate/conversion-rate.usecase";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {DateUtils} from "../../infrastructure/common/utils/date.utils";
import {BaseM} from "../../domain/model/base";


@Injectable()
export class PaymentUsecase extends BaseUsecase<PaymentRepository, PaymentM> {
    constructor(repository: PaymentRepository,
                private readonly invoiceUsecase: InvoiceUsecase,
                private readonly acquisitionUsecase: AcquisitionUsecase,
                private readonly conversionRateUsecase: ConversionRateUsecase,
    ) {
        super(repository);
    }

    async create(input: CreatePaymentDto): Promise<PaymentM> {
        const invoice = await this.invoiceUsecase.readById(input.invoiceId)
        const conversionRate = await this.conversionRateUsecase.readByAssetIdAndCurrencyId(input.payAssetId, invoice.currencyId)
        const payment: Omit<PaymentM, keyof BaseM> = {
            payAmount: invoice.amount / conversionRate.rate,
            conversionRateId: conversionRate.id,
            status: PaymentStatusEnum.PENDING,
            expiresAt: DateUtils.getNextXHours(2), /* TODO: a job to expire payments */
            baseAmount: invoice.amount,
            baseCurrencyId: invoice.currencyId,
            shopId: invoice.shopId,
            payAssetId: input.payAssetId,
            invoiceId: input.invoiceId,
        }
        const paymentCreated = await this.repository.insert(payment)
        const acquisition = await this.acquisitionUsecase.acquireWalletForPayment(paymentCreated.id, paymentCreated.payAssetId)
        payment.acquisitions = [acquisition]
        return paymentCreated
    }
}