import {EnvironmentConfigService} from "../../../common/config/environment_config.service";
import {Configuration, MidgardApi, PoolDetail} from "@xchainjs/xchain-midgard";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MidgardClient {

    private readonly midgardApi: MidgardApi

    constructor(private readonly environmentConfigService: EnvironmentConfigService) {
        const {baseUrl} = environmentConfigService.getMidgardConfig()
        const apiConfig = new Configuration({basePath: baseUrl})
        this.midgardApi = new MidgardApi(apiConfig)
    }

    async getPoolInfo(chainName: string, assetName: string, contract?: string): Promise<PoolDetail> {
        let poolName;
        if (contract) {
            poolName = `${chainName}.${assetName}-${contract}`
        } else {
            poolName = `${chainName}.${assetName}`
        }
        const res = await this.midgardApi.getPool(poolName)
        return res.data
    }

    async getAssetPriceUSD(chainName: string, assetName: string, contract?: string): Promise<number> {
        const poolDetails = await this.getPoolInfo(chainName, assetName, contract)
        return parseFloat(poolDetails.assetPriceUSD)
    }

    async getAssetsWithPrice(): Promise<{ asset: string, chain: string, contract: string, priceUsd: number }[]> {
        const res = await this.midgardApi.getPools('available')
        const result = []

        for (const poolDetail of res.data) {
            let chain, asset, contract;
            const ticker = poolDetail.asset
            const [chainName, assetContract] = ticker.split('.')
            chain = chainName
            const split = assetContract.split('-')
            if (split.length >= 2) {
                asset = split[0]
                contract = split[1]
            } else {
                asset = split[0]
            }
            result.push({chain, asset, contract, priceUsd: parseFloat(poolDetail.assetPriceUSD)})
        }
        return result
    }
}