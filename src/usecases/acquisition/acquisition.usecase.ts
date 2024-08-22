import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AcquisitionRepository} from "../../infrastructure/repositories/providers/acquisition.repository";
import {AcquisitionM} from "../../domain/model/acquisition";
import {WalletUsecase} from "../wallet/wallet.usecase";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";
import {WalletM} from "../../domain/model/wallet";
import {AddressAssetUsecase} from "../address-asset/address-asset.usecase";
import {AssetUsecase} from "../asset/asset.usecase";
import {AcquisitionStateEnum} from "../../domain/enum/acquisition-state.enum";

@Injectable()
export class AcquisitionUsecase extends BaseUsecase<AcquisitionRepository, AcquisitionM> {

    constructor(repository: AcquisitionRepository,
                private readonly walletUsecase: WalletUsecase,
                private readonly addressAssetUsecase: AddressAssetUsecase,
                private readonly assetUsecase: AssetUsecase) {
        super(repository);
    }

    async acquireWalletForPayment(paymentId: number, assetId: number): Promise<AcquisitionM> {
        let wallet: WalletM;
        try {
            wallet = await this.walletUsecase.acquireWallet()
        } catch (e) {
            if (e instanceof ResourceNotFoundException) {
                wallet = await this.walletUsecase.generate(true)
            }
        }
        const asset = await this.assetUsecase.readById(assetId)
        const addressAsset = await this.addressAssetUsecase.createIfNotExists(wallet, asset)
        return this.repository.insert({
            paymentId,
            acquiredWalletId: wallet.id,
            addressAssetId: addressAsset.id,
            state: AcquisitionStateEnum.ACTIVE
        })

    }
}