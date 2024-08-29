import {ExplorerTransactionType} from "../explorer-transaction.type";

export interface XChainClientInterface {
    getAddress(): Promise<string>

    getTransactionsSince(address: string, since: Date): Promise<ExplorerTransactionType[]>
}