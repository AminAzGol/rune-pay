import {Module} from "@nestjs/common";
import {HealthSeed} from "./providers/health.seed";
import {AllSeed} from "./all.seed";
import {UsecasesModule} from "../usecases/usecases.module";

@Module({
    imports: [UsecasesModule],
    providers: [HealthSeed, AllSeed],
    exports: [AllSeed]
})
export class SeedModule {
}
