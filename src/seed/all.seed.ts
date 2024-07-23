import {HealthSeed} from "./providers/health.seed";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AllSeed {
    constructor(
        private readonly healthSeed: HealthSeed
    ) {
    }

    async runSeeds() {
        await this.healthSeed.runHealthSeed()
    }
}