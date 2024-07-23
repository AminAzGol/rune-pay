import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {EnvironmentConfigService} from "./infrastructure/common/config/environment_config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )
    const environmentConfigService = app.get(EnvironmentConfigService);
    await app.listen(environmentConfigService.getPort());
}

bootstrap();
