import {Module} from "@nestjs/common";
import {RepositoriesModule} from "../infrastructure/repositories/repository.module";
import {HealthUsecase} from "./health/health.usecase";
import {ExceptionsModule} from "../infrastructure/services/exceptions/exceptions.module";
import {UserUsecase} from "./user/user.usecase";
import {CryptographyModule} from "../infrastructure/services/cryptography/cryptography.module";
import {ShopUsecase} from "./shop/shop.usecase";
import {ShopUserUsecase} from "./shop-user/shop-user.usecase";
import {CurrencyUsecase} from "./currency/currency.usecase";
import {ProductUsecase} from "./product/product.usecase";

@Module({
    imports: [RepositoriesModule, ExceptionsModule, CryptographyModule],
    providers: [HealthUsecase, UserUsecase, ShopUsecase, ShopUserUsecase, CurrencyUsecase, ProductUsecase],
    exports: [HealthUsecase, UserUsecase, ShopUsecase, ShopUserUsecase, CurrencyUsecase, ProductUsecase],
})
export class UsecasesModule {
}
