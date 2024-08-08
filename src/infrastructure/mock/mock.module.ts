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
import {AssetMock} from "./asset.mock";
import {WalletAddressMock} from "./wallet-address.mock";
import {AddressAssetMock} from "./address-asset.mock";
import {InvoiceMock} from "./invoice.mock";
import {ConversionRateMock} from "./conversion-rate.mock";
import {PaymentMock} from "./payment.mock";

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
        ChainMock,
        AssetMock,
        WalletAddressMock,
        AddressAssetMock,
        InvoiceMock,
        ConversionRateMock,
        PaymentMock
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
        ChainMock,
        AssetMock,
        WalletAddressMock,
        AddressAssetMock,
        InvoiceMock,
        ConversionRateMock,
        PaymentMock
    ]
})

export class MockModule {
}