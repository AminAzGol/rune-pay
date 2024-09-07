import {ExplorerTransactionType} from "../explorer-transaction.type";

export interface XChainClientInterface {
    getAddress(): Promise<string>

    getTransactionsSince(address: string, since: Date): Promise<ExplorerTransactionType[]>

    transfer(assetName: string, amount: string, recipient: string): Promise<string>
}