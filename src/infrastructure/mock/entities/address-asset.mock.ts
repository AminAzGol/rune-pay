import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {AddressAssetM} from "../../../domain/model/address-asset";
import {AddressAssetRepository} from "../../repositories/providers/address-asset.repository";
import {WalletAddressMock} from "./wallet-address.mock";
import {AssetMock} from "./asset.mock";
import {AssetM} from "../../../domain/model/asset";
import {WalletAddressM} from "../../../domain/model/wallet-address";


@Injectable()
export class AddressAssetMock extends BaseMock<AddressAssetM> {

    constructor(repository: AddressAssetRepository, private readonly walletAddressMock: WalletAddressMock, private readonly assetMocK: AssetMock) {
        const samples = []
        super(repository, samples);
    }

    async prepareDependencies(except?: { walletAddress?: boolean, asset?: boolean }) {
        const result = {walletAddress: undefined as WalletAddressM, asset: undefined as AssetM}
        if (!except?.walletAddress) {
            result.walletAddress = await this.walletAddressMock.createMock(0);
        }
        if (!except?.asset) {
            result.asset = await this.assetMocK.createMock(0)
        }

        return result
    }

    async createMock(index: number): Promise<AddressAssetM> {
        const {walletAddress, asset} = await this.prepareDependencies()
        return await this.createCustom({addressId: walletAddress.id, assetId: asset.id})
    }
}