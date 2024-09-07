import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ShopWalletAddressRepository} from "../../infrastructure/repositories/providers/shop-wallet-address.repository";
import {ShopWalletAddressM} from "../../domain/model/shop-wallet-address";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";

@Injectable()
export class ShopWalletAddressUsecase extends BaseUsecase<ShopWalletAddressRepository, ShopWalletAddressM> {

    constructor(repository: ShopWalletAddressRepository) {
        super(repository);
    }

    async readByShopId(shopId: number): Promise<ShopWalletAddressM> {
        const result = await this.repository.findAll({shopId})
        if (result.length === 0) {
            throw new ResourceNotFoundException('ShopWalletAddress', {shopId})
        } else {
            return result[0]
        }
    }
}