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
import {CurrencyRepository} from "./providers/currency.repository";
import {CurrencyEntity} from "../entities/currency.entity";
import {ProductEntity} from "../entities/product.entity";
import {ProductRepository} from "./providers/product.repository";
import {ProductPriceRepository} from "./providers/product-price.repository";
import {ProductPriceEntity} from "../entities/product-price.entity";

@Module({
    imports: [
        CryptographyModule,
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([
            HealthEntity,
            UserEntity,
            ShopEntity,
            ShopUserEntity,
            CurrencyEntity,
            ProductEntity,
            ProductPriceEntity
        ]),
    ],
    providers: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository,
        ShopRepository,
        ShopUserRepository,
        CurrencyRepository,
        ProductRepository,
        ProductPriceRepository

    ],
    exports: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository,
        ShopRepository,
        ShopUserRepository,
        CurrencyRepository,
        ProductRepository,
        ProductPriceRepository
    ]
})
export class RepositoriesModule {
}