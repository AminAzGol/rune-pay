import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigModule} from "../common/typeorm/typeorm-config.module";
import {HealthRepository} from "./providers/health.repository";
import {HealthEntity} from "../entities/health.entity";
import {UserEntity} from "../entities/user.entity";
import {UserRepository} from "./providers/user.repository";
import {CryptographyModule} from "../services/cryptography/cryptography.module";
import {ShopEntity} from "../entities/shop.entity";
import {ShopRepository} from "./providers/shop.repository";
import {ShopUserEntity} from "../entities/shop-user.entity";
import {ShopUserRepository} from "./providers/shop-user.repository";

@Module({
    imports: [
        CryptographyModule,
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([
            HealthEntity,
            UserEntity,
            ShopEntity,
            ShopUserEntity
        ]),
    ],
    providers: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository,
        ShopRepository,
        ShopUserRepository

    ],
    exports: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository,
        ShopRepository,
        ShopUserRepository
    ]
})
export class RepositoriesModule {
}