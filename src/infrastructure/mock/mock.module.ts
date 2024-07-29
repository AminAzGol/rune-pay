import {Module} from "@nestjs/common";
import {UserMock} from "./user.mock";
import {RepositoriesModule} from "../repositories/repository.module";
import {ShopMock} from "./shop.mock";
import {ShopUserMock} from "./shop-user.mock";
import {CurrencyMock} from "./currency.mock";
import {ProductMock} from "./product.mock";
import {ProductPriceMock} from "./product-price.mock";

@Module({
    imports: [RepositoriesModule],
    providers: [UserMock, ShopMock, ShopUserMock, CurrencyMock, ProductMock, ProductPriceMock],
    exports: [UserMock, ShopMock, ShopUserMock, CurrencyMock, ProductMock, ProductPriceMock]
})

export class MockModule {
}