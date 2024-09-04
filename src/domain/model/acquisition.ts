import {AcquisitionStateEnum} from "../enum/acquisition-state.enum";
import {BaseM} from "./base";
import {WalletM} from "./wallet";
import {TransactionM} from "./transaction";

export class AcquisitionM extends BaseM {
    addressAssetId: number
    state: AcquisitionStateEnum
    acquiredWalletId: number
    acquiredWallet?: WalletM
}

export type AcquisitionWithTxs = AcquisitionM & { txs: TransactionM[] }