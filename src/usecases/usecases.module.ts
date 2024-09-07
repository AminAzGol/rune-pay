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
import {ChainUsecase} from "./chain/chain.usecase";
import {AssetUsecase} from "./asset/asset.usecase";
import {WalletAddressUsecase} from "./wallet-address/wallet-address.usecase";
import {AddressAssetUsecase} from "./address-asset/address-asset.usecase";
import {ConversionRateUsecase} from "./conversion-rate/conversion-rate.usecase";
import {PaymentUsecase} from "./payment/payment.usecase";
import {AcquisitionUsecase} from "./acquisition/acquisition.usecase";
import {TransactionUsecase} from "./transaction/transaction.usecase";
import {SettlementUsecase} from "./settlement/settlement.usecase";
import {TransferUsecase} from "./transfer/transfer.usecase";
import {ShopWalletAddressUsecase} from "./shop-wallet-address/shop-wallet-address.usecase";
import {XChainJsModule} from "../infrastructure/services/chain-manager/xchainjs.module";
import {RoleUsecase} from "./role/role.usecase";
import {EnvironmentConfigModule} from "../infrastructure/common/config/environment_config.module";

@Module({
    imports: [RepositoriesModule, ExceptionsModule, CryptographyModule, XChainJsModule, EnvironmentConfigModule],
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
        WalletUsecase,
        ChainUsecase,
        AssetUsecase,
        WalletAddressUsecase,
        AddressAssetUsecase,
        ConversionRateUsecase,
        PaymentUsecase,
        AcquisitionUsecase,
        TransactionUsecase,
        SettlementUsecase,
        TransferUsecase,
        ShopWalletAddressUsecase,
        RoleUsecase
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
        WalletUsecase,
        ChainUsecase,
        AssetUsecase,
        WalletAddressUsecase,
        AddressAssetUsecase,
        ConversionRateUsecase,
        PaymentUsecase,
        AcquisitionUsecase,
        TransactionUsecase,
        SettlementUsecase,
        TransferUsecase,
        ShopWalletAddressUsecase,
        RoleUsecase
    ],
})
export class UsecasesModule {
}