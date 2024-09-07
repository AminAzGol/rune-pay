import {
    XChainClientFactoryInterface
} from "../../../domain/types/chain-manager/factories/xchain-client-factory.interface";
import {ChainEnum} from "../../../domain/enum/chain.enum";
import {BscClientFactory} from "./clients/bsc/bsc-client";
import {WalletM} from "../../../domain/model/wallet";
import {Injectable} from "@nestjs/common";
import {XChainClientInterface} from "../../../domain/types/chain-manager/factories/xchain-client.interface";
import {BtcClientFactory} from "./clients/btc/btc-client.factory";
import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";

@Injectable()
export class ChainManagerService {
    private factoriesPerChain: { [key: string]: XChainClientFactoryInterface } = {}

    constructor(bscClientFactory: BscClientFactory, btcClientFactory: BtcClientFactory) {
        this.factoriesPerChain[ChainEnum.BSC] = bscClientFactory
        this.factoriesPerChain[ChainEnum.BTC] = btcClientFactory
    }

    getFactory(chain: string): XChainClientFactoryInterface {
        const chainFactory = this.factoriesPerChain[chain]
        if (!chainFactory) {
            throw new ResourceNotFoundException('no chain factory for ', chain)
        }
        return chainFactory
    }

    async getChainClient(chain: string, wallet: WalletM) {
        const factory = this.getFactory(chain)
        return await factory.createClient(wallet)
    }

    async getAllClients(wallet: WalletM): Promise<{ [key: string]: XChainClientInterface }> {
        const result = {}
        for (const chain of Object.values(ChainEnum)) {
            result[chain] = await this.getChainClient(chain as ChainEnum, wallet)
        }
        return result
    }

}