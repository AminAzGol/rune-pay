import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {SettlementM} from "../../../domain/model/settlement";
import {SettlementRepository} from "../../repositories/providers/settlement.repository";
import {SettlementStatusEnum} from "../../../domain/enum/settlement-status.enum";
import {PaymentM} from "../../../domain/model/payment";
import {PaymentMock} from "./payment.mock";
import {AcquisitionMock} from "./acquisition.mock";
import {ShopWalletAddressM} from "../../../domain/model/shop-wallet-address";
import {ShopWalletAddressMock} from "./shop-wallet-address.mock";


@Injectable()
export class SettlementMock extends BaseMock<SettlementM> {

    constructor(repository: SettlementRepository, private readonly paymentMock: PaymentMock, private readonly acquisitionMock: AcquisitionMock, private readonly shopWalletAddressMock: ShopWalletAddressMock) {
        const samples = [
            {status: SettlementStatusEnum.PENDING}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { payment?: boolean, shopWalletAddress?: boolean }) {
        const result = {
            payment: undefined as PaymentM,
            shopWalletAddress: undefined as ShopWalletAddressM,
        }
        if (!except?.payment) {
            result.payment = await this.paymentMock.createMock(0)
        }
        if (!except?.shopWalletAddress) {
            result.shopWalletAddress = await this.shopWalletAddressMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<SettlementM> {
        const sample = this.getSample(index)
        const {payment, shopWalletAddress} = await this.prepareDependencies()
        sample.paymentAssetId = payment.payAssetId
        sample.settlementAssetId = payment.payAssetId
        sample.paymentAmount = payment.payAmount
        sample.shopWalletAddressId = payment.payAssetId
        sample.shopId = payment.shopId
        sample.invoiceId = payment.invoiceId
        sample.shopWalletAddressId = shopWalletAddress.id

        return await this.createCustom(sample)
    }
}