import {TxParty} from "./tx-party.type";

export type ExplorerTransactionType = {
    assetName: string;
    contractAddress?: string;
    hash: string
    timestamp: Date | null
    confirmations: number
    from: TxParty[]
    to: TxParty[]
}
