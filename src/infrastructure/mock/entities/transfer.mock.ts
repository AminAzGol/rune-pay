import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {TransferM} from "../../../domain/model/transfer";
import {TransferRepository} from "../../repositories/providers/transfer.repository";
import {SettlementM} from "../../../domain/model/settlement";
import {ShopWalletAddressMock} from "./shop-wallet-address.mock";
import {SettlementMock} from "./settlement.mock";
import {TransferStatusEnum} from "../../../domain/enum/transfer-status.enum";


@Injectable()
export class TransferMock extends BaseMock<TransferM> {

    constructor(repository: TransferRepository,
                private readonly shopWalletAddressMock: ShopWalletAddressMock,
                private readonly settlementMock: SettlementMock,
    ) {
        const samples = [
            {
                hash: 'xyz',
                status: TransferStatusEnum.DONE
            }
        ]
        super(repository, samples);
    }

    async prepareDependencies() {
        const result = {
            settlement: undefined as SettlementM
        }
        result.settlement = await this.settlementMock.createMock(0)
        return result
    }

    async createMock(index: number): Promise<TransferM> {
        const sample = this.getSample(index)
        const {settlement} = await this.prepareDependencies()
        sample.assetId = settlement.settlementAssetId
        sample.settlementId = settlement.id
        sample.amount = settlement.paymentAmount
        return await this.createCustom(sample)
    }
}