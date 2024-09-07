import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {PaymentM} from "../../../domain/model/payment";
import {PaymentRepository} from "../../repositories/providers/payment.repository";
import {PaymentStatusEnum} from "../../../domain/enum/payment-status.enum";
import {ConversionRateMock} from "./conversion-rate.mock";
import {ConversionRateM} from "../../../domain/model/conversion-rate";
import {InvoiceMock} from "./invoice.mock";
import {InvoiceM} from "../../../domain/model/invoice";
import {AcquisitionM} from "../../../domain/model/acquisition";
import {AcquisitionMock} from "./acquisition.mock";
import {AcquisitionStateEnum} from "../../../domain/enum/acquisition-state.enum";
import {DateUtils} from "../../common/utils/date.utils";


@Injectable()
export class PaymentMock extends BaseMock<PaymentM> {

    constructor(repository: PaymentRepository,
                private readonly conversionRateMock: ConversionRateMock,
                private readonly invoiceMock: InvoiceMock,
                private readonly acquisitionMock: AcquisitionMock
    ) {
        const samples = [
            {
                baseAmount: '10',
                payAmount: '0.00001',
                status: PaymentStatusEnum.PAID,
                expiresAt: DateUtils.getNextXHours(1)
            },
            {
                baseAmount: '10',
                payAmount: '10',
                status: PaymentStatusEnum.EXPIRED,
                expiresAt: new Date()
            }
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { conversionRate: boolean }) {
        const result = {
            acquisition: undefined as AcquisitionM,
            conversionRate: undefined as ConversionRateM,
            invoice: undefined as InvoiceM
        }
        let assetId: number
        let currencyId: number
        if (true) {
            const deps = await this.acquisitionMock.prepareDependencies()
            result.acquisition = await this.acquisitionMock.createCustom({
                acquiredWalletId: deps.wallet.id,
                addressAssetId: deps.addressAsset.id,
                state: AcquisitionStateEnum.ACTIVE
            })
            assetId = deps.addressAsset.assetId
        }
        if (true) {
            result.invoice = await this.invoiceMock.createMock(0)
            currencyId = result.invoice.currencyId
        }
        if (!except?.conversionRate) {
            result.conversionRate = await this.conversionRateMock.createCustom({
                assetId,
                currencyId,
                expiresAt: DateUtils.getNextXHours(1),
                rate: 0.5
            })
        }
        return result
    }

    async createMock(index: number): Promise<PaymentM> {
        const sample = this.getSample(index)
        const {conversionRate, invoice, acquisition} = await this.prepareDependencies()
        sample.conversionRateId = conversionRate.id
        sample.invoiceId = invoice.id
        sample.shopId = invoice.shopId
        sample.payAssetId = conversionRate.assetId
        sample.baseCurrencyId = conversionRate.currencyId
        sample.acquisitionId = acquisition.id
        return await this.createCustom(sample)
    }
}