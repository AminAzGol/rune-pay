import {AssetRepository} from "../../infrastructure/repositories/providers/asset.repository";
import {AssetEnum} from "../../domain/enum/asset.enum";
import {ChainEnum} from "../../domain/enum/chain.enum";
import {ChainRepository} from "../../infrastructure/repositories/providers/chain.repository";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AssetSeed {

    seeds = [
        // {
        //     name: AssetEnum.BTC,
        //     chain: ChainEnum.BTC,
        //     contract: undefined
        // },
        {
            name: AssetEnum.USDT,
            chain: ChainEnum.BSC,
            contract: '0X55D398326F99059FF775485246999027B3197955'
        },
        {
            name: AssetEnum.BNB,
            chain: ChainEnum.BSC,
            contract: undefined
        }
    ]

    constructor(private readonly assetRepository: AssetRepository, private readonly chainRepository: ChainRepository) {
    }

    async runSeed() {
        const chains = await this.chainRepository.findAll()
        for (const assetSeed of this.seeds) {
            const chain = chains.find(o => o.name === assetSeed.chain)
            if (!chain) {
                throw new ResourceNotFoundException('Chain', {name: assetSeed.chain})
            }
            const existingRecords = await this.assetRepository.findAll({chainId: chain.id, name: assetSeed.name})
            if (existingRecords?.length === 0) {
                await this.assetRepository.insert({
                    chainId: chain.id,
                    name: assetSeed.name,
                    contractAddress: assetSeed.contract,
                    isActive: true
                })
            }
        }
    }
}