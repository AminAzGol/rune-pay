import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {AcquisitionM} from "../../domain/model/acquisition";
import {AcquisitionRepository} from "../repositories/providers/acquisition.repository";
import {AcquisitionStateEnum} from "../../domain/enum/acquisition-state.enum";
import {AddressAssetMock} from "./address-asset.mock";
import {PaymentMock} from "./payment.mock";
import {PaymentM} from "../../domain/model/payment";
import {AddressAssetM} from "../../domain/model/address-asset";
import {WalletM} from "../../domain/model/wallet";
import {WalletRepository} from "../repositories/providers/wallet.repository";
import {WalletAddressRepository} from "../repositories/providers/wallet-address.repository";


@Injectable()
export class AcquisitionMock extends BaseMock<AcquisitionM> {

    constructor(repository: AcquisitionRepository,
                private readonly addressAssetMock: AddressAssetMock,
                private readonly paymentMock: PaymentMock,
                private readonly walletAddressRepository: WalletAddressRepository,
                private readonly walletRepository: WalletRepository
    ) {
        const samples = [
            {state: AcquisitionStateEnum.ACTIVE}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { payment?: boolean, addressAsset?: boolean }) {
        const result = {
            payment: undefined as PaymentM,
            addressAsset: undefined as AddressAssetM,
            wallet: undefined as WalletM
        }
        if (!except?.payment) {
            result.payment = await this.paymentMock.createMock(0)
        }
        if (!except?.addressAsset) {
            result.addressAsset = await this.addressAssetMock.createMock(0)
            const walletAddress = await this.walletAddressRepository.findById(result.addressAsset.addressId)
            result.wallet = await this.walletRepository.findById(walletAddress.walletId)
        }
        return result
    }

    async createMock(index: number): Promise<AcquisitionM> {
        const sample = await this.getSample(index)
        const {payment, addressAsset, wallet} = await this.prepareDependencies()
        sample.paymentId = payment.id
        sample.addressAssetId = addressAsset.id
        sample.acquiredWalletId = wallet.id
        return await this.createCustom(sample)
    }
}