import {HealthSeed} from "./providers/health.seed";
import {Injectable} from "@nestjs/common";
import {ChainSeed} from "./providers/chain.seed";
import {CurrencySeed} from "./providers/currency.seed";
import {AssetSeed} from "./providers/asset.seed";

@Injectable()
export class AllSeed {
    constructor(
        private readonly healthSeed: HealthSeed,
        private readonly chainSeed: ChainSeed,
        private readonly currencySeed: CurrencySeed,
        private readonly assetSeed: AssetSeed
    ) {
    }

    async runSeeds() {
        await this.healthSeed.runHealthSeed()
        await this.chainSeed.runSeed()
        await this.currencySeed.runSeed()
        await this.assetSeed.runSeed()
    }
}