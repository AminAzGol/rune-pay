import {BaseM} from "./base";
import {SettlementStatusEnum} from "../enum/settlement-status.enum";

export class SettlementM extends BaseM {
    shopId: number
    addressAssetId: number
    totalPaymentsAmount: number
    paymentAssetId: number
    settlementAssetId: number
    settlementAmount: number
    conversionRateId: number
    status: SettlementStatusEnum
}