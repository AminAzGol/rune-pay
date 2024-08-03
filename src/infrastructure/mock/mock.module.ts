import {Module} from "@nestjs/common";
import {UserMock} from "./user.mock";
import {RepositoriesModule} from "../repositories/repository.module";
import {ShopMock} from "./shop.mock";
import {ShopUserMock} from "./shop-user.mock";
import {CurrencyMock} from "./currency.mock";
import {ProductMock} from "./product.mock";
import {ProductPriceMock} from "./product-price.mock";
import {OrderMock} from "./order.mock";
import {OrderProductPriceMock} from "./order-product-price.mock";
import {WalletMock} from "./wallet.mock";
import {ChainMock} from "./chain.mock";

@Module({
    imports: [RepositoriesModule],
    providers: [
        UserMock,
        ShopMock,
        ShopUserMock,
        CurrencyMock,
        ProductMock,
        ProductPriceMock,
        OrderMock,
        OrderProductPriceMock,
        WalletMock,
        ChainMock
    ],
    exports: [
        UserMock,
        ShopMock,
        ShopUserMock,
        CurrencyMock,
        ProductMock,
        ProductPriceMock,
        OrderMock,
        OrderProductPriceMock,
        WalletMock,
        ChainMock
    ]
})

export class MockModule {
}