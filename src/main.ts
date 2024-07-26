import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {EnvironmentConfigService} from "./infrastructure/common/config/environment_config.service";
import {I18nValidationPipe} from "nestjs-i18n";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new I18nValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    // app.useGlobalFilters(
    //     new I18nValidationExceptionFilter({
    //         detailedErrors: false,
    //     }),
    // );
    // app.useGlobalFilters(new ExceptionsFilter())
    const environmentConfigService = app.get(EnvironmentConfigService);
    await app.listen(environmentConfigService.getPort());
}

bootstrap();
