import {AcquisitionStateEnum} from "../enum/acquisition-state.enum";
import {BaseM} from "./base";
import {WalletM} from "./wallet";

export class AcquisitionM extends BaseM {
    paymentId: number
    addressAssetId: number
    state: AcquisitionStateEnum
    acquiredWalletId: number
    acquiredWallet?: WalletM
}