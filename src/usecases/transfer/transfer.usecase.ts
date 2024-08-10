import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {TransferRepository} from "../../infrastructure/repositories/providers/transfer.repository";
import {TransferM} from "../../domain/model/transfer";
import {SettlementRepository} from "../../infrastructure/repositories/providers/settlement.repository";
import {ShopWalletAddressRepository} from "../../infrastructure/repositories/providers/shop-wallet-address.repository";
import {ResourcePreconditionFailed} from "../../domain/exceptions/resource-exceptions";

@Injectable()
export class TransferUsecase extends BaseUsecase<TransferRepository, TransferM> {

    constructor(repository: TransferRepository, private readonly settlementRepository: SettlementRepository, private readonly shopWalletAddressRepository: ShopWalletAddressRepository) {
        super(repository);
    }

    async create(input): Promise<TransferM> {
        throw new Error('not available')
    }

    async createTransfer(input: { settlementId: number, shopWalletAddressId: number }) {
        const settlement = await this.settlementRepository.findById(input.settlementId)
        const shopWalletAddress = await this.shopWalletAddressRepository.findById(input.shopWalletAddressId)
        //TODO: check settlement.shopId == caller.shopId
        if (settlement.shopId !== shopWalletAddress.shopId) {
            throw new ResourcePreconditionFailed('Transfer', {...input}, 'shop-wallet-address and settlement must be for the same shop')
        }
        if (settlement.settlementAssetId !== shopWalletAddress.assetId) {
            throw new ResourcePreconditionFailed('Transfer', {...input}, 'shop-wallet-address and settlement must have the same asset id')
        }
        return this.repository.insert({
            settlementId: settlement.id,
            shopWalletAddressId: shopWalletAddress.id,
            assetId: settlement.settlementAssetId,
            amount: settlement.settlementAmount
        })
    }
}