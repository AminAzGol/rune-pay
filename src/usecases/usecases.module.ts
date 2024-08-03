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
import {ProductPriceUsecase} from "./product-price/product-price.usecase";
import {OrderUsecase} from "./order/order.usecase";
import {OrderProductPriceUsecase} from "./order-product-price/order-product-price.usecase";
import {InvoiceUsecase} from "./invoice/invoice.usecase";
import {WalletUsecase} from "./wallet/wallet.usecase";

@Module({
    imports: [RepositoriesModule, ExceptionsModule, CryptographyModule],
    providers: [
        HealthUsecase,
        UserUsecase,
        ShopUsecase,
        ShopUserUsecase,
        CurrencyUsecase,
        ProductUsecase,
        ProductPriceUsecase,
        OrderUsecase,
        OrderProductPriceUsecase,
        InvoiceUsecase,
        WalletUsecase
    ],
    exports: [
        HealthUsecase,
        UserUsecase,
        ShopUsecase,
        ShopUserUsecase,
        CurrencyUsecase,
        ProductUsecase,
        ProductPriceUsecase,
        OrderUsecase,
        OrderProductPriceUsecase,
        InvoiceUsecase,
        WalletUsecase
    ],
})
export class UsecasesModule {
}