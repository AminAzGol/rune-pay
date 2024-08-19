import {HealthSeed} from "./providers/health.seed";
import {Injectable} from "@nestjs/common";
import {ChainSeed} from "./providers/chain.seed";

@Injectable()
export class AllSeed {
    constructor(
        private readonly healthSeed: HealthSeed,
        private readonly chainSeed: ChainSeed
    ) {
    }

    async runSeeds() {
        await this.healthSeed.runHealthSeed()
        await this.chainSeed.runSeed()
    }
}