import {BaseM} from "./base";
import {SettlementStatusEnum} from "../enum/settlement-status.enum";
import {SettlementTypeEnum} from "../enum/settlement-type.enum";

export class SettlementM extends BaseM {
    shopId: number
    invoiceId: number
    acquisitionId: number
    paymentId: number
    paymentAmount: string
    paymentAssetId: number
    settlementAssetId: number
    shopWalletAddressId: number
    status: SettlementStatusEnum
    type: SettlementTypeEnum
}