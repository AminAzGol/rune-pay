import {Test} from "@nestjs/testing";
import {AppModule} from "../../app.module";
import {SeedModule} from "../../seed/seed.module";
import {ValidationPipe} from "@nestjs/common";
import {NestApplication} from "@nestjs/core";
import {MockModule} from "../mock/mock.module";
import {TypeOrmConfigSingleton} from "../common/typeorm/typeorm.config";
import {Pg} from "./pg";
import {AuthGuardMock} from "../mock/entities/auth-guard.mock";
import {AuthGuard} from "../common/guards/auth-guard";
import {CryptographyService} from "../services/cryptography/cryptography-service";
import {UserMock} from "../mock/entities/user.mock";
import {ShopMock} from "../mock/entities/shop.mock";
import {RoleMock} from "../mock/entities/role.mock";
import {RoleEnum} from "../../domain/enum/role.enum";
import {ShopM} from "../../domain/model/shop";
import {UserM} from "../../domain/model/user";

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

    async initTestAppWithAuthGuard() {
        TypeOrmConfigSingleton.setCustomConfig({schema: this.schema})
        await this.pg.createSchema(this.schema)
        const moduleRef = await Test.createTestingModule({imports: [AppModule, SeedModule, MockModule]})
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

    async signShopOwnerToken(): Promise<{ shop: ShopM, user: UserM, accessToken: string }> {
        const user = await this.app.get(UserMock).createMock(0)
        const shop = await this.app.get(ShopMock).createMock(0)
        await this.app.get(RoleMock).createCustom({shopId: shop.id, userId: user.id, role: RoleEnum.SHOP_OWNER})
        const token = await this.app.get(CryptographyService).signUserJwtToken({userId: user.id, email: user.email})
        return {
            shop,
            user,
            accessToken: "Bearer " + token
        }
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