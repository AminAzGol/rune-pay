import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AddressAssetRepository} from "../../infrastructure/repositories/providers/address-asset.repository";
import {AddressAssetM} from "../../domain/model/address-asset";
import {WalletM} from "../../domain/model/wallet";
import {AssetM} from "../../domain/model/asset";
import {ChainUsecase} from "../chain/chain.usecase";
import {WalletAddressUsecase} from "../wallet-address/wallet-address.usecase";

@Injectable()
export class AddressAssetUsecase extends BaseUsecase<AddressAssetRepository, AddressAssetM> {

    constructor(repository: AddressAssetRepository, private readonly chainUsecase: ChainUsecase, private readonly walletAddressUsecase: WalletAddressUsecase) {
        super(repository);
    }

    async createIfNotExists(wallet: WalletM, asset: AssetM): Promise<AddressAssetM> {
        const chain = await this.chainUsecase.readById(asset.chainId)
        const walletAddress = await this.walletAddressUsecase.createIfNotExists(wallet, chain)
        const existingRecords = await this.repository.findAll({addressId: walletAddress.id, assetId: asset.id})
        if (existingRecords?.length > 0) {
            return existingRecords[0]
        }
        return this.repository.insert({addressId: walletAddress.id, assetId: asset.id})
    }
}