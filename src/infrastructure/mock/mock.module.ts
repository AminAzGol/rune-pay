import {Module} from "@nestjs/common";
import {UserMock} from "./entities/user.mock";
import {RepositoriesModule} from "../repositories/repository.module";
import {ShopMock} from "./entities/shop.mock";
import {ShopUserMock} from "./entities/shop-user.mock";
import {CurrencyMock} from "./entities/currency.mock";
import {ProductMock} from "./entities/product.mock";
import {ProductPriceMock} from "./entities/product-price.mock";
import {OrderMock} from "./entities/order.mock";
import {OrderProductPriceMock} from "./entities/order-product-price.mock";
import {WalletMock} from "./entities/wallet.mock";
import {ChainMock} from "./entities/chain.mock";
import {AssetMock} from "./entities/asset.mock";
import {WalletAddressMock} from "./entities/wallet-address.mock";
import {AddressAssetMock} from "./entities/address-asset.mock";
import {InvoiceMock} from "./entities/invoice.mock";
import {ConversionRateMock} from "./entities/conversion-rate.mock";
import {PaymentMock} from "./entities/payment.mock";
import {AcquisitionMock} from "./entities/acquisition.mock";
import {TransactionMock} from "./entities/transaction.mock";
import {SettlementMock} from "./entities/settlement.mock";
import {ShopWalletAddressMock} from "./entities/shop-wallet-address.mock";
import {TransferMock} from "./entities/transfer.mock";
import {RoleMock} from "./entities/role.mock";

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
        RoleMock,
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
        RoleMock,
    ]
})

export class MockModule {
}