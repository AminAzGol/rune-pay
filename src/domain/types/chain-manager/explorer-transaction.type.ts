import {TxParty} from "./tx-party.type";

export type ExplorerTransactionType = {
    assetName: string;
    contractAddress?: string;
    hash: string
    date: Date
    confirmations: number
    from: TxParty[]
    to: TxParty[]
}
