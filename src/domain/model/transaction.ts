import {BaseM} from "./base";
import {TxParty} from "../types/chain-manager/tx-party.type";

export class TransactionM extends BaseM {
    walletAddressId: number
    amountReceived: string
    assetName: string
    confirmations: number
    hash: string
    from: TxParty[]
    to: TxParty[]
    date: Date
    associatedAssetId?: number
}
