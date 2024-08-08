import {BaseM} from "./base";
import {PaymentStatusEnum} from "../enum/payment-status.enum";

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
}