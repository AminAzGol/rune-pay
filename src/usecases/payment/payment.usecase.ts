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
        const payment = new PaymentM()
        payment.payAssetId = input.payAssetId
        payment.invoiceId = input.invoiceId
        const invoice = await this.invoiceUsecase.readById(input.invoiceId)
        payment.baseAmount = invoice.amount
        payment.baseCurrencyId = invoice.currencyId
        payment.shopId = invoice.shopId
        const conversionRate = await this.conversionRateUsecase.readByAssetIdAndCurrencyId(input.payAssetId, invoice.currencyId)
        payment.payAmount = invoice.amount / conversionRate.rate
        payment.conversionRateId = conversionRate.id
        payment.status = PaymentStatusEnum.PENDING
        payment.expiresAt = DateUtils.getNextXHours(2) /* TODO: a job to expire payments */
        const paymentCreated = await this.repository.insert(payment)
        const acquisition = await this.acquisitionUsecase.acquireWalletForPayment(paymentCreated.id, paymentCreated.payAssetId)
        payment.acquisitions = [acquisition]
        return paymentCreated
    }
}