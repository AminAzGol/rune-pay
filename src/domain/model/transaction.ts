import {BaseM} from "./base";
import {TxParty} from "../types/chain-manager/tx-party.type";
import {TxPartySideEnum} from "../enum/tx-party-side.enum";

export class TransactionM extends BaseM {
    walletAddressId: number
    walletAddressSide: TxPartySideEnum
    amountReceived: string
    assetName: string
    confirmations: number
    hash: string
    from: TxParty[]
    to: TxParty[]
    timestamp: Date
    associatedAssetId?: number
    acquisitionId?: number
}
