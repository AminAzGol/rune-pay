import {BaseM} from "./base";
import {PaymentStatusEnum} from "../enum/payment-status.enum";

export class PaymentM extends BaseM {
    shopId: number
    invoiceId: number
    baseCurrency: number
    baseAmount: number
    payAsset: number
    payAmount: number
    conversionRateId: number
    addressAssetId: number
    status: PaymentStatusEnum
    expiresAt: Date
}