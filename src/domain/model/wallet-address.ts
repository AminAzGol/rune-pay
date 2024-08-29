import {BaseM} from "./base";
import {WalletM} from "./wallet";
import {ChainM} from "./chain";

export class WalletAddressM extends BaseM {
    walletId: number
    address: string
    chainId: number
}

export type WalletAddressWithRelations = WalletAddressM & {
    wallet: WalletM,
    chain: ChainM
}