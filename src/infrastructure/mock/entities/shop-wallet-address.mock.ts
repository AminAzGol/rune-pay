import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {ShopWalletAddressM} from "../../../domain/model/shop-wallet-address";
import {ShopWalletAddressRepository} from "../../repositories/providers/shop-wallet-address.repository";
import {ShopM} from "../../../domain/model/shop";
import {AssetM} from "../../../domain/model/asset";
import {ShopMock} from "./shop.mock";
import {AssetMock} from "./asset.mock";


@Injectable()
export class ShopWalletAddressMock extends BaseMock<ShopWalletAddressM> {

    constructor(repository: ShopWalletAddressRepository, private readonly shopMock: ShopMock, private readonly assetMock: AssetMock) {
        const samples = [
            {address: 'xyz'}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { shop?: boolean, asset?: boolean }) {
        const result = {shop: undefined as ShopM, asset: undefined as AssetM}
        if (!except?.shop) {
            result.shop = await this.shopMock.createMock(0)
        }
        if (!except?.asset) {
            result.asset = await this.assetMock.createMock(0)
        }
        return result

    }

    async createMock(index: number): Promise<ShopWalletAddressM> {
        const {shop, asset} = await this.prepareDependencies()
        const sample = this.getSample(index)
        return await this.createCustom({...sample, shopId: shop.id, assetId: asset.id})
    }
}