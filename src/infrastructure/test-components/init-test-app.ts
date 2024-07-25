import {Test} from "@nestjs/testing";
import {AppModule} from "../../app.module";
import {SeedModule} from "../../seed/seed.module";
import {ValidationPipe} from "@nestjs/common";
import {NestApplication} from "@nestjs/core";
import {MockModule} from "../mock/mock.module";

export async function initTestApp() {
    const moduleRef = await Test.createTestingModule({imports: [AppModule, SeedModule, MockModule]}).compile()
    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    await app.init();
    return app as NestApplication
}