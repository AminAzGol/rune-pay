import {BaseM} from "./base";
import {TransferStatusEnum} from "../enum/transfer-status.enum";

export class TransferM extends BaseM {
    settlementId: number
    amount: string
    destination: string
    assetId: number
    hash: string
    status: TransferStatusEnum
}