import {XChainClientInterface} from "../../../../../domain/types/chain-manager/factories/xchain-client.interface";
import {ExplorerTransactionType} from "../../../../../domain/types/chain-manager/explorer-transaction.type";
import {Client} from "@xchainjs/xchain-bitcoin";
import {BIP32Interface} from "bip32";
import * as bitcoin from "bitcoinjs-lib";

export class BtcClient implements XChainClientInterface {
    address: string;

    constructor(protected readonly client: Client, private readonly bip32Node: BIP32Interface) {
    }

    async getTransactionsSince(address: string, since: Date): Promise<ExplorerTransactionType[]> {
        return Promise.resolve([]);
    }

    async getAddress(): Promise<string> {
        if (!this.address) {
            const payment = bitcoin.payments.p2wpkh({pubkey: this.bip32Node.publicKey})
            this.address = payment.address
        }
        return this.address
    }
}