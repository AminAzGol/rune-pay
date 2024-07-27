import {Module} from '@nestjs/common';
import {EnvironmentConfigModule} from "./infrastructure/common/config/environment_config.module";
import {ControllersModule} from "./infrastructure/controllers/controllers.module";
import {UsecasesModule} from "./usecases/usecases.module";
import {RepositoriesModule} from "./infrastructure/repositories/repository.module";
import *as path from "path";
import {AcceptLanguageResolver, HeaderResolver, I18nModule} from "nestjs-i18n";
import {ExceptionsFilter} from "./infrastructure/common/filters/exceptions.filter";
import {APP_FILTER} from '@nestjs/core';

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

    ],
    providers: [
        {
            provide: APP_FILTER,
            useFactory() {
                return new ExceptionsFilter(console)
            },
        },
    ],
})
export class AppModule {
}
