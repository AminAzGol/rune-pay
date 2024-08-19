import {WalletM} from "../model/wallet";
import {XChainClientInterface} from "./xchain-client.interface";

export interface XChainClientFactoryInterface {
    createClient(wallet: WalletM): Promise<XChainClientInterface>
}