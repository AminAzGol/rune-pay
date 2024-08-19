import {Test} from "@nestjs/testing";
import {AppModule} from "../../app.module";
import {SeedModule} from "../../seed/seed.module";
import {ValidationPipe} from "@nestjs/common";
import {NestApplication} from "@nestjs/core";
import {MockModule} from "../mock/mock.module";
import {TypeOrmConfigSingleton} from "../common/typeorm/typeorm.config";
import {Pg} from "./pg";
import {AuthGuardMock} from "../mock/auth-guard.mock";
import {AuthGuard} from "../common/guards/auth-guard";

export class TestUtils {
    schema: string
    pg: Pg
    app: NestApplication

    constructor(testName: string) {
        this.schema = 'test_rune_pay_' + testName
        this.pg = new Pg()
    }

    async initTestApp() {
        TypeOrmConfigSingleton.setCustomConfig({schema: this.schema})
        await this.pg.createSchema(this.schema)
        const moduleRef = await Test.createTestingModule({imports: [AppModule, SeedModule, MockModule]})
            .overrideProvider(AuthGuard).useValue(new AuthGuardMock())
            .compile()
        this.app = moduleRef.createNestApplication();
        this.app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );
        await this.app.init();
        return this.app as NestApplication
    }

    async clearDb() {
        await this.pg.clearAllTables(this.schema)
    }

    async destroyTestApp() {
        await this.pg.dropSchema(this.schema)
        await this.pg.closeConnection()
        await this.app.close()
    }
}