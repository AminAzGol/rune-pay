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
import {AcquisitionMock} from "./acquisition.mock";
import {TransactionMock} from "./transaction.mock";
import {SettlementMock} from "./settlement.mock";
import {ShopWalletAddressMock} from "./shop-wallet-address.mock";
import {TransferMock} from "./transfer.mock";
import {RoleMock} from "./role.mock";

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
        PaymentMock,
        AcquisitionMock,
        TransactionMock,
        SettlementMock,
        ShopWalletAddressMock,
        TransferMock,
        RoleMock
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
        PaymentMock,
        AcquisitionMock,
        TransactionMock,
        SettlementMock,
        TransferMock,
        ShopWalletAddressMock,
        RoleMock
    ]
})

export class MockModule {
}