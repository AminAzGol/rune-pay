import {BaseM} from "./base";
import {PaymentStatusEnum} from "../enum/payment-status.enum";
import {AcquisitionM, AcquisitionWithTxs} from "./acquisition";

export class PaymentM extends BaseM {
    shopId: number
    invoiceId: number
    baseCurrencyId: number
    baseAmount: number
    payAssetId: number
    payAmount: number
    conversionRateId: number
    status: PaymentStatusEnum
    expiresAt: Date
    acquisitionId: number
    acquisition?: AcquisitionM
}

export type PaymentWithTxs = PaymentM & { acquisition: AcquisitionWithTxs }