import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {PaymentM} from "../../domain/model/payment";
import {PaymentRepository} from "../repositories/providers/payment.repository";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {ConversionRateMock} from "./conversion-rate.mock";
import {ConversionRateM} from "../../domain/model/conversion-rate";
import {InvoiceMock} from "./invoice.mock";
import {InvoiceM} from "../../domain/model/invoice";


@Injectable()
export class PaymentMock extends BaseMock<PaymentM> {

    constructor(repository: PaymentRepository, private readonly conversionRateMock: ConversionRateMock, private readonly invoiceMock: InvoiceMock) {
        const samples = [
            {
                baseAmount: 10,
                payAmount: 10,
                status: PaymentStatusEnum.PENDING,
                expiresAt: new Date()
            }
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { conversionRate: boolean, invoice: boolean }) {
        const result = {conversionRate: undefined as ConversionRateM, invoice: undefined as InvoiceM}
        if (!except?.conversionRate) {
            result.conversionRate = await this.conversionRateMock.createMock(0)
        }
        if (!except?.invoice) {
            result.invoice = await this.invoiceMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<PaymentM> {
        const sample = this.getSample(0)
        const {conversionRate, invoice} = await this.prepareDependencies()
        sample.conversionRateId = conversionRate.id
        sample.invoiceId = invoice.id
        sample.shopId = invoice.shopId
        sample.payAssetId = conversionRate.assetId
        sample.baseCurrencyId = conversionRate.currencyId
        return await this.createCustom(sample)
    }
}