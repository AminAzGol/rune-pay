import {XChainClientInterface} from "../../../../../domain/types/chain-manager/factories/xchain-client.interface";
import {ExplorerTransactionType} from "../../../../../domain/types/chain-manager/explorer-transaction.type";
import {Client} from "@xchainjs/xchain-bitcoin";
import {BIP32Interface} from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import {BtcExplorerService} from "../../explorers/btc-explorer.service";
import {DateUtils} from "../../../../common/utils/date.utils";
import {AssetEnum} from "../../../../../domain/enum/asset.enum";
import {TxParty} from "../../../../../domain/types/chain-manager/tx-party.type";
import Big from 'big.js'
import {Network} from 'bitcoinjs-lib/src/networks'

export class BtcClient implements XChainClientInterface {
    nativeAsset = AssetEnum.BTC
    address: string;

    constructor(
        private readonly network: Network,
        protected readonly client: Client,
        private readonly bip32Node: BIP32Interface,
        private readonly btcExplorerService: BtcExplorerService
    ) {
    }

    async getTransactionsSince(address: string, since: Date): Promise<ExplorerTransactionType[]> {
        const pageSize = 50
        let transactions: ExplorerTransactionType[] = []
        let afterTxHash = undefined
        while (true) {
            const txs = await this.getTxs(address, afterTxHash)
            if (txs.length === 0) {
                break;
            }
            const dateFiltered = txs.filter(tx => tx.timestamp === null || tx.timestamp >= since)
            transactions = transactions.concat(dateFiltered)
            if (dateFiltered.length < txs.length || txs.length < pageSize) {
                break;
            }
            afterTxHash = txs[txs.length - 1].hash
            await DateUtils.sleep(1000)
        }
        return transactions
    }

    async getAddress(): Promise<string> {
        if (!this.address) {
            const payment = bitcoin.payments.p2wpkh({pubkey: this.bip32Node.publicKey, network: this.network});
            this.address = payment.address
        }
        return this.address
    }

    transfer(assetName: string, amount: string, recipient: string): Promise<string> {
        return Promise.resolve("");
    }


    async getTxs(address: string, afterTxHash?: string): Promise<ExplorerTransactionType[]> {
        const transactions = await this.btcExplorerService.getTxList(address, afterTxHash)
        const blockHeight = await this.btcExplorerService.getBlockHeight()
        const result: ExplorerTransactionType[] = []
        for (const transaction of transactions) {
            result.push({
                hash: transaction.txid,
                timestamp: this.getDate(transaction),
                assetName: this.nativeAsset,
                from: this.parseTxParties(transaction.vin.map(o => o.prevout)),
                to: this.parseTxParties(transaction.vout),
                confirmations: this.calcConfirmations(blockHeight, transaction)
            })
        }
        return result
    }

    private calcConfirmations(blockHeight, transaction): number {
        if (transaction.status?.confirmed === true) {
            const txBlockHeight = transaction.status.block_height
            return blockHeight - txBlockHeight + 1
        } else {
            return 0
        }
    }

    private getDate(transaction): Date | null {
        if (transaction.status?.confirmed) {
            return DateUtils.timestampToDate(transaction.status.block_time)
        } else {
            return null
        }
    }

    private parseTxParties(input: any[]): TxParty[] {
        const result: TxParty[] = []
        for (const record of input) {
            result.push({
                address: record.scriptpubkey_address,
                amount: this.toBitcoin(record.value)
            })
        }
        return result
    }

    private toBitcoin(satoshi: string): string {
        const conversion = 100000000;
        const bigSatoshi = new Big(satoshi);
        return bigSatoshi.div(conversion).toString();
    }
}