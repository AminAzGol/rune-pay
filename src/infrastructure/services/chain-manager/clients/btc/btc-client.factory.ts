import {EnvironmentConfigService} from "../../../../common/config/environment_config.service";
import {
    XChainClientFactoryInterface
} from "../../../../../domain/types/chain-manager/factories/xchain-client-factory.interface";
import {WalletM} from "../../../../../domain/model/wallet";
import {BtcClient} from "./btc-client";
import {WalletService} from "../../wallet/wallet.service";
import {Client, defaultBTCParams} from '@xchainjs/xchain-bitcoin'
import {Injectable} from "@nestjs/common";
import * as ecc from 'tiny-secp256k1'
import * as bip39 from 'bip39';
import {BIP32Factory} from 'bip32';

@Injectable()
export class BtcClientFactory implements XChainClientFactoryInterface {
    constructor(private readonly environmentConfigService: EnvironmentConfigService, private readonly walletService: WalletService) {
    }

    async createClient(wallet: WalletM): Promise<BtcClient> {
        const config = this.environmentConfigService.getChainsConfig().btc
        const phrase = await this.walletService.decryptExistingKeystore(wallet.keystore)
        defaultBTCParams.network = config.network
        defaultBTCParams.phrase = phrase
        const btcClient = new Client({...defaultBTCParams})
        const seed = await bip39.mnemonicToSeed(phrase)
        const bip32 = BIP32Factory(ecc)
        const node = bip32.fromSeed(seed)
        return new BtcClient(btcClient, node)
    }

}