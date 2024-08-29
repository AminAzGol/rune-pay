import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AssetRepository} from "../../infrastructure/repositories/providers/asset.repository";
import {AssetM} from "../../domain/model/asset";
import {ExplorerTransactionType} from "../../domain/types/chain-manager/explorer-transaction.type";

@Injectable()
export class AssetUsecase extends BaseUsecase<AssetRepository, AssetM> {

    constructor(repository: AssetRepository) {
        super(repository);
    }

    async getTransactionAssetId(transaction: ExplorerTransactionType): Promise<AssetM> {
        const assets = await this.repository.findAll()
        for (const asset of assets) {
            if (asset.contractAddress) {
                if (asset.contractAddress.toLowerCase() === transaction.contractAddress?.toLowerCase()) {
                    return asset
                }
            } else {
                if (asset.name === transaction.assetName) {
                    return asset
                }
            }
        }
        return null
    }
}