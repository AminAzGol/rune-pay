import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {SettlementM} from "../../../domain/model/settlement";
import {SettlementRepository} from "../../repositories/providers/settlement.repository";
import {SettlementStatusEnum} from "../../../domain/enum/settlement-status.enum";
import {PaymentM} from "../../../domain/model/payment";
import {PaymentMock} from "./payment.mock";
import {AcquisitionMock} from "./acquisition.mock";
import {AddressAssetM} from "../../../domain/model/address-asset";


@Injectable()
export class SettlementMock extends BaseMock<SettlementM> {

    constructor(repository: SettlementRepository, private readonly paymentMock: PaymentMock, private readonly acquisitionMock: AcquisitionMock) {
        const samples = [
            {status: SettlementStatusEnum.PENDING}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { payment1?: boolean, payment2?: boolean }) {
        const result = {
            payment1: undefined as PaymentM,
            payment2: undefined as PaymentM,
        }
        let addressAsset: AddressAssetM
        if (!except || !except.payment1 || !except.payment2) {
            const res = await this.acquisitionMock.prepareDependencies({payment: true})
            addressAsset = res.addressAsset
        }
        if (!except?.payment1) {
            result.payment1 = await this.paymentMock.createMock(0)
            const sample = this.acquisitionMock.getSample(0)
            await this.acquisitionMock.createCustom({
                state: sample.state,
                paymentId: result.payment1.id,
                addressAssetId: addressAsset.id,
                acquiredWalletId: 1
            })
        }
        return result
    }

    async createMock(index: number): Promise<SettlementM> {
        const sample = this.getSample(index)
        const {payment1} = await this.prepareDependencies({payment2: true})
        sample.settlementAmount = payment1.payAmount
        sample.paymentAssetId = payment1.payAssetId
        sample.settlementAssetId = payment1.payAssetId
        sample.totalPaymentsAmount = payment1.payAmount
        sample.addressAssetId = payment1.payAssetId
        sample.shopId = payment1.shopId
        return await this.createCustom(sample)
    }
}