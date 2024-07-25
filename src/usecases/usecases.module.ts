import {Module} from "@nestjs/common";
import {RepositoriesModule} from "../infrastructure/repositories/repository.module";
import {HealthUsecase} from "./health/health.usecase";
import {ExceptionsModule} from "../infrastructure/services/exceptions/exceptions.module";
import {UserUsecase} from "./user/user.usecase";
import {CryptographyModule} from "../infrastructure/services/cryptography/cryptography.module";

@Module({
    imports: [RepositoriesModule, ExceptionsModule, CryptographyModule],
    providers: [HealthUsecase, UserUsecase],
    exports: [HealthUsecase, UserUsecase],
})
export class UsecasesModule {
}
