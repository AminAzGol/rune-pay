import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {TransferRepository} from "../../infrastructure/repositories/providers/transfer.repository";
import {TransferM} from "../../domain/model/transfer";
import {ResourcePreconditionFailed} from "../../domain/exceptions/resource-exceptions";
import {ShopWalletAddressUsecase} from "../shop-wallet-address/shop-wallet-address.usecase";
import {AcquisitionUsecase} from "../acquisition/acquisition.usecase";
import {ChainManagerService} from "../../infrastructure/services/chain-manager/chain-manager.service";
import {AssetUsecase} from "../asset/asset.usecase";
import {WalletUsecase} from "../wallet/wallet.usecase";
import {TransferStatusEnum} from "../../domain/enum/transfer-status.enum";
import {SettlementM} from "../../domain/model/settlement";

@Injectable()
export class TransferUsecase extends BaseUsecase<TransferRepository, TransferM> {

    constructor(repository: TransferRepository,
                private readonly shopWalletAddressUsecase: ShopWalletAddressUsecase,
                private readonly acquisitionUsecase: AcquisitionUsecase,
                private readonly assetUsecase: AssetUsecase,
                private readonly chainManagerService: ChainManagerService,
                private readonly walletUsecase: WalletUsecase,
    ) {
        super(repository);
    }

    async create(input): Promise<TransferM> {
        throw new Error('not available')
    }

    async performTransfer(settlement: SettlementM) {
        const shopWalletAddress = await this.shopWalletAddressUsecase.readById(settlement.shopWalletAddressId)
        if (settlement.shopId !== shopWalletAddress.shopId) {
            throw new ResourcePreconditionFailed('Transfer', {
                settlementShopId: settlement.shopId,
                shopWalletAddressShopId: shopWalletAddress.shopId
            }, 'shop-wallet-address and settlement must be for the same shop')
        }
        if (settlement.settlementAssetId !== shopWalletAddress.assetId) {
            throw new ResourcePreconditionFailed('Transfer', {
                shopWalletAddressAssetId: shopWalletAddress.assetId,
                settlementAssetId: settlement.settlementAssetId
            }, 'shop-wallet-address and settlement must have the same asset id')
        }
        let status = TransferStatusEnum.CREATED
        let hash: string
        let transfer = await this.repository.insert({
            settlementId: settlement.id,
            amount: settlement.paymentAmount,
            assetId: settlement.settlementAssetId,
            destination: shopWalletAddress.address,
            hash,
            status,
        })
        try {
            const asset = await this.assetUsecase.readById(settlement.settlementAssetId)
            const acquisition = await this.acquisitionUsecase.readById(settlement.acquisitionId)
            const wallet = await this.walletUsecase.readById(acquisition.acquiredWalletId)
            const client = await this.chainManagerService.getChainClient(asset.chain.name, wallet)
            hash = await client.transfer(asset.name, settlement.paymentAmount, shopWalletAddress.address)
            status = TransferStatusEnum.DONE
        } catch (e) {
            status = TransferStatusEnum.FAILED
            throw e
        } finally {
            const result = await this.repository.update(transfer.id, {status, hash})
            transfer.status = result.status
            transfer.hash = result.hash
        }
        return transfer
    }
}