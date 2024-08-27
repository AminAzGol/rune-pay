import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {TransferM} from "../../../domain/model/transfer";
import {TransferRepository} from "../../repositories/providers/transfer.repository";
import {ShopWalletAddressM} from "../../../domain/model/shop-wallet-address";
import {SettlementM} from "../../../domain/model/settlement";
import {ShopWalletAddressMock} from "./shop-wallet-address.mock";
import {SettlementMock} from "./settlement.mock";


@Injectable()
export class TransferMock extends BaseMock<TransferM> {

    constructor(repository: TransferRepository,
                private readonly shopWalletAddressMock: ShopWalletAddressMock,
                private readonly settlementMock: SettlementMock,
    ) {
        const samples = [
            {
                amount: 1000,
            }
        ]
        super(repository, samples);
    }

    async prepareDependencies() {
        const result = {
            shopWalletAddress: undefined as ShopWalletAddressM,
            settlement: undefined as SettlementM
        }
        result.settlement = await this.settlementMock.createMock(0)
        const assetId = result.settlement.settlementAssetId
        const shopId = result.settlement.shopId
        result.shopWalletAddress = await this.shopWalletAddressMock.createCustom({
            shopId,
            assetId,
            address: 'xxxyyzz'
        })
        return result
    }

    async createMock(index: number): Promise<TransferM> {
        const sample = this.getSample(index)
        const {shopWalletAddress, settlement} = await this.prepareDependencies()
        sample.assetId = settlement.settlementAssetId
        sample.settlementId = settlement.id
        sample.shopWalletAddressId = shopWalletAddress.id
        return await this.createCustom(sample)
    }
}