import {BaseM} from "./base";
import {WalletAddressM} from "./wallet-address";

export class WalletM extends BaseM {
    keystore: any
    acquired?: boolean
    walletAddresses?: WalletAddressM[]
}