import {BaseM} from "./base";

export class TransactionM extends BaseM {
    acquisitionId: number
    amount: number
    confirmations: number
    minConfirmations: number
    hash: string
    from: string
    assetTicker: string
    assetsMatch: boolean
}