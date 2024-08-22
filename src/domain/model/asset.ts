import {BaseM} from "./base";
import {ChainM} from "./chain";

export class AssetM extends BaseM {
    name: string
    chainId: number
    contractAddress: string
    isActive: boolean
    chain?: ChainM
}