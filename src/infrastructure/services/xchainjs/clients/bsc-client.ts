import {BaseXChainClient} from "./base-xchain-client";
import {EnvironmentConfigService} from "../../../common/config/environment_config.service";
import {BSCChain, Client, ClientKeystore, defaultBscParams} from "@xchainjs/xchain-bsc";
import {EtherscanProvider} from "@xchainjs/xchain-evm-providers";
import {WalletM} from "../../../../domain/model/wallet";
import {WalletService} from "../wallet/wallet.service";
import {XChainClientInterface} from "../../../../domain/factories/xchain-client.interface";
import {XChainClientFactoryInterface} from "../../../../domain/factories/xchain-client-factory.interface";
import * as assert from "assert";
import {Injectable} from "@nestjs/common";

export class BscClient extends BaseXChainClient implements XChainClientInterface {
    constructor(client: ClientKeystore, minConfirmations: number) {
        super(client, minConfirmations);
    }
}

@Injectable()
export class BscClientFactory implements XChainClientFactoryInterface {
    apiKey: string
    baseUrl: string
    minConfirmations: number

    constructor(private readonly environmentConfigService: EnvironmentConfigService, private readonly walletService: WalletService) {
        const config = this.environmentConfigService.getChainsConfig()
        assert(config.bsc.apiKey, 'bsc.apiKey is not provided')
        assert(config.bsc.baseUrl, 'bsc.baseUrl is not provided')
        assert(config.bsc.minConfirmations, 'bsc.minConfirmations is not provided')
        this.baseUrl = config.bsc.baseUrl
        this.apiKey = config.bsc.apiKey
        this.minConfirmations = config.bsc.minConfirmations
    }

    async createClient(wallet: WalletM): Promise<BscClient> {
        const phrase = await this.walletService.decryptExistingKeystore(JSON.parse(wallet.keystore))
        defaultBscParams.dataProviders[0].mainnet = new EtherscanProvider(defaultBscParams.providers.mainnet,
            this.baseUrl,
            this.apiKey,
            BSCChain,
            defaultBscParams.gasAsset,
            defaultBscParams.gasAssetDecimals
        )
        defaultBscParams.phrase = phrase
        const client = new Client(defaultBscParams)
        return new BscClient(client, this.minConfirmations)
    }
}