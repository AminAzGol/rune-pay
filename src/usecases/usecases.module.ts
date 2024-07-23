import {Module} from "@nestjs/common";
import {RepositoriesModule} from "../infrastructure/repositories/repository.module";
import {HealthUsecase} from "./health/health.usecase";
import {ExceptionsModule} from "../infrastructure/services/exceptions/exceptions.module";

@Module({
    imports: [RepositoriesModule, ExceptionsModule],
    providers: [HealthUsecase],
    exports: [HealthUsecase],
})
export class UsecasesModule {
}
