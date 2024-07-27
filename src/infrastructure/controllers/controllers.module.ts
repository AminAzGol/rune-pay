import {HealthController} from "./health/health.controller";
import {Module} from "@nestjs/common";
import {UsecasesModule} from "../../usecases/usecases.module";
import {UserController} from "./user/user.controller";
import {ShopController} from "./shop/shop.controller";
import {ShopUserController} from "./shop-user/shop-user.controller";
import {CurrencyController} from "./currency/currency.controller";
import {ProductController} from "./product/product.controller";

@Module({
    imports: [UsecasesModule],
    providers: [],
    controllers: [
        HealthController,
        UserController,
        ShopController,
        ShopUserController,
        CurrencyController,
        ProductController
    ],
})
export class ControllersModule {
}
