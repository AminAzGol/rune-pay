import {BaseM} from "./base";

export class TransactionM extends BaseM {
    acquisitionId: number
    type: 'transfer' | 'unknown'
    amount: number
    assetSymbol: string
    confirmations: number
    minConfirmations: number
    hash: string
    from: TxParty[]
    to: TxParty[]
    assetsMatch: boolean
}

export class TxParty {
    address: string
    amount: string
    assetSymbol: string
}