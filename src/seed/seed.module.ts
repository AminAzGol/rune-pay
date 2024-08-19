import {Module} from "@nestjs/common";
import {HealthSeed} from "./providers/health.seed";
import {AllSeed} from "./all.seed";
import {UsecasesModule} from "../usecases/usecases.module";
import {ChainSeed} from "./providers/chain.seed";
import {RepositoriesModule} from "../infrastructure/repositories/repository.module";

@Module({
    imports: [UsecasesModule, RepositoriesModule],
    providers: [HealthSeed, AllSeed, ChainSeed],
    exports: [AllSeed]
})
export class SeedModule {
}
