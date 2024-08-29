import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {TransactionRepository} from "../../infrastructure/repositories/providers/transaction.repository";
import {TransactionM} from "../../domain/model/transaction";
import {WalletAddressWithRelations} from "../../domain/model/wallet-address";
import {ChainManagerService} from "../../infrastructure/services/chain-manager/chain-manager.service";
import {ChainEnum} from "../../domain/enum/chain.enum";
import {AssetUsecase} from "../asset/asset.usecase";

@Injectable()
export class TransactionUsecase extends BaseUsecase<TransactionRepository, TransactionM> {

    constructor(
        repository: TransactionRepository,
        private readonly chainManagerService: ChainManagerService,
        private readonly assetUsecase: AssetUsecase,
    ) {
        super(repository);
    }

    async updateAllTransactionsOfAddress(walletAddress: WalletAddressWithRelations) {
        const recentTransaction = await this.getLatestTransaction(walletAddress.id)
        let since: Date;
        if (recentTransaction) {
            since = recentTransaction.date
            since.setHours(-1)
        } else {
            since = new Date('1979-01-01')
        }
        return await this.updateTransactionsSince(walletAddress, since)
    }

    async updateTransactionsSince(walletAddress: WalletAddressWithRelations, since: Date) {
        const {chain, wallet} = walletAddress
        const client = await this.chainManagerService.getChainClient(chain.name as ChainEnum, wallet)
        const transactions = await client.getTransactionsSince(walletAddress.address, since)
        if (transactions.length > 0) {
            for (const transaction of transactions) {
                const existing = await this.repository.findByHash(transaction.hash)
                if (existing) {
                    await this.repository.update(existing.id, {confirmations: transaction.confirmations})
                } else {
                    let amount = '0'
                    const asReceiver = transaction.to.find(o => o.address === walletAddress.address)
                    if (asReceiver) {
                        amount = asReceiver.amount
                    }
                    const associatedAsset = await this.assetUsecase.getTransactionAssetId(transaction)
                    await this.repository.insert({
                        hash: transaction.hash,
                        date: transaction.date,
                        confirmations: transaction.confirmations,
                        from: transaction.from,
                        to: transaction.to,
                        amountReceived: amount,
                        assetName: transaction.assetName,
                        associatedAssetId: associatedAsset?.id,
                        walletAddressId: walletAddress.id,
                    })
                }
            }
        }
    }

    async getLatestTransaction(walletAddressId: number): Promise<TransactionM> {
        const result = await this.repository.findAllPaginated({
            order: 'DESC',
            skip: 0,
            take: 1
        }, {
            walletAddressId
        })
        if (result.data.length > 0) {
            return result.data[0]
        } else {
            return null
        }
    }
}