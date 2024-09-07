import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';
import {Network} from "@xchainjs/xchain-client";
import {ChainEnum} from "../../../domain/enum/chain.enum";

@Injectable()
export class EnvironmentConfigService {
    constructor(private configService: ConfigService) {
    }

    getPort(): number {
        return this.configService.get<number>('port');
    }

    getJwtConfig(): { algorithm: 'RS256' | 'RS512', accessTokenExpire: string, refreshTokenExpire: string } {
        return this.configService.get('jwt')
    }

    getKeys(): { privateKey: string, publicKey: string } {
        return this.configService.get('keys')
    }

    getWalletConfig(): { password: string } {
        return this.configService.get('wallet')
    }

    getChainsConfig(): {
        bsc: {
            apiKey: string,
            baseUrl: string,
            minConfirmations: number
        },
        btc: {
            network: Network,
            baseUrl: string,
            minConfirmations: number,
        }
    } {
        return this.configService.get('chains')
    }

    getMidgardConfig(): { baseUrl: string } {
        return this.configService.get('midgard')
    }

    getChainConfirmations(chain: ChainEnum): number {
        const config = this.getChainsConfig()
        if (chain === ChainEnum.BSC) {
            return config.bsc.minConfirmations
        } else if (chain === ChainEnum.BTC) {
            return config.btc.minConfirmations
        }
    }
}
