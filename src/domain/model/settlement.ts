import {BaseM} from "./base";
import {SettlementStatusEnum} from "../enum/settlement-status.enum";
import {PaymentM} from "./payment";

export class SettlementM extends BaseM {
    shopId: number
    addressAssetId: number
    totalPaymentsAmount: number
    paymentAssetId: number
    settlementAssetId: number
    settlementAmount: number
    status: SettlementStatusEnum
    payments: PaymentM[]
}