import {Module} from "@nestjs/common";
import {HealthSeed} from "./providers/health.seed";
import {AllSeed} from "./all.seed";
import {UsecasesModule} from "../usecases/usecases.module";
import {ChainSeed} from "./providers/chain.seed";
import {RepositoriesModule} from "../infrastructure/repositories/repository.module";
import {CurrencySeed} from "./providers/currency.seed";
import {AssetSeed} from "./providers/asset.seed";

@Module({
    imports: [UsecasesModule, RepositoriesModule],
    providers: [HealthSeed, AllSeed, ChainSeed, CurrencySeed, AssetSeed],
    exports: [AllSeed]
})
export class SeedModule {
}
