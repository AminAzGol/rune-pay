import {Module} from '@nestjs/common';
import {EnvironmentConfigModule} from "./infrastructure/common/config/environment_config.module";
import {ControllersModule} from "./infrastructure/controllers/controllers.module";
import {UsecasesModule} from "./usecases/usecases.module";
import {RepositoriesModule} from "./infrastructure/repositories/repository.module";

@Module({
    imports: [
        EnvironmentConfigModule,
        ControllersModule,
        UsecasesModule,
        RepositoriesModule,
    ],
    providers: [],
})
export class AppModule {
}
