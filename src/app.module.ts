import {Module} from '@nestjs/common';
import {EnvironmentConfigModule} from "./infrastructure/common/config/environment_config.module";
import {ControllersModule} from "./infrastructure/controllers/controllers.module";
import {UsecasesModule} from "./usecases/usecases.module";
import {RepositoriesModule} from "./infrastructure/repositories/repository.module";
import *as path from "path";
import {AcceptLanguageResolver, HeaderResolver, I18nModule} from "nestjs-i18n";
import {ExceptionsFilter} from "./infrastructure/common/filters/exceptions.filter";
import {APP_FILTER, APP_GUARD} from '@nestjs/core';
import {AuthGuard} from "./infrastructure/common/guards/auth-guard";
import {CryptographyModule} from "./infrastructure/services/cryptography/cryptography.module";

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: false,
            },
            resolvers: [
                /* I18nMiddleware supports this format */
                new HeaderResolver(['Accept-Language']),
                new AcceptLanguageResolver(),
            ],
        }),
        EnvironmentConfigModule,
        ControllersModule,
        UsecasesModule,
        RepositoriesModule,
        CryptographyModule

    ],
    providers: [
        {
            provide: APP_FILTER,
            useFactory() {
                return new ExceptionsFilter(console)
            },
        },
        AuthGuard, //This is a dummy import but enables overriding it in tests
        {
            provide: APP_GUARD,
            useExisting: AuthGuard,
        },
    ],
})
export class AppModule {
}
