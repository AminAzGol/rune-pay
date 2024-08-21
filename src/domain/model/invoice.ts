import {BaseM} from "./base";
import {InvoiceStatusEnum} from "../enum/invoice-status.enum";

export class InvoiceM extends BaseM {
    orderId?: number
    currencyId: number
    shopId: number
    amount: number
    status: InvoiceStatusEnum
    expiresAt: Date
}