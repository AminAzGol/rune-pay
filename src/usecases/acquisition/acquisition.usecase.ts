import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AcquisitionRepository} from "../../infrastructure/repositories/providers/acquisition.repository";
import {AcquisitionM, AcquisitionWithTxs} from "../../domain/model/acquisition";
import {WalletUsecase} from "../wallet/wallet.usecase";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";
import {WalletM} from "../../domain/model/wallet";
import {AddressAssetUsecase} from "../address-asset/address-asset.usecase";
import {AssetUsecase} from "../asset/asset.usecase";
import {AcquisitionStateEnum} from "../../domain/enum/acquisition-state.enum";
import {WalletAddressUsecase} from "../wallet-address/wallet-address.usecase";
import {TransactionUsecase} from "../transaction/transaction.usecase";
import {TxPartySideEnum} from "../../domain/enum/tx-party-side.enum";

@Injectable()
export class AcquisitionUsecase extends BaseUsecase<AcquisitionRepository, AcquisitionM> {

    constructor(repository: AcquisitionRepository,
                private readonly walletUsecase: WalletUsecase,
                private readonly addressAssetUsecase: AddressAssetUsecase,
                private readonly assetUsecase: AssetUsecase,
                private readonly walletAddressUsecase: WalletAddressUsecase,
                private readonly transactionUsecase: TransactionUsecase
    ) {
        super(repository);
    }

    async acquireWalletForPayment(assetId: number): Promise<AcquisitionM> {
        let wallet: WalletM;
        try {
            wallet = await this.walletUsecase.acquireWallet()
        } catch (e) {
            if (e instanceof ResourceNotFoundException) {
                wallet = await this.walletUsecase.generate(true)
            }
        }
        const asset = await this.assetUsecase.readById(assetId)
        const addressAsset = await this.addressAssetUsecase.createIfNotExists(wallet, asset)
        return this.repository.insert({
            acquiredWalletId: wallet.id,
            addressAssetId: addressAsset.id,
            state: AcquisitionStateEnum.ACTIVE
        })
    }

    async releaseWallet(acquisitionId: number): Promise<void> {
        const acquisition = await this.repository.findById(acquisitionId)
        await this.walletUsecase.releaseWallet(acquisition.acquiredWalletId)
    }

    async updateAcquisitionTransactions(acquisitionId: number): Promise<void> {
        const acquisition = await this.readById(acquisitionId)
        const addressAsset = await this.addressAssetUsecase.readById(acquisition.addressAssetId)
        const walletAddress = await this.walletAddressUsecase.getWalletAddressWithRelations(addressAsset.addressId)
        const latestTransaction = await this.transactionUsecase.getLatestTransaction(walletAddress.id)
        if (latestTransaction) {
            await this.transactionUsecase.updateTransactionsSince(walletAddress, latestTransaction.timestamp)
        } else {
            await this.transactionUsecase.updateTransactionsSince(walletAddress, new Date('1970-01-01'))
        }
        const transactions = await this.transactionUsecase.readByAddressId(walletAddress.id, false, TxPartySideEnum.RECEIVER)
        const promises = []
        for (const tx of transactions) {
            if (tx.associatedAssetId === addressAsset.assetId && tx.timestamp >= acquisition.createdAt) {
                promises.push(this.transactionUsecase.update(tx.id, {acquisitionId: acquisition.id}))
            }
        }
        await Promise.all(promises)
    }

    async readById(id: number): Promise<AcquisitionWithTxs> {
        const acquisition = await super.readById(id)
        const transactions = await this.transactionUsecase.readByAcquisitionId(acquisition.id)
        return {
            ...acquisition,
            txs: transactions,
        }
    }
}