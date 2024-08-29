import {HealthController} from "./health/health.controller";
import {Module} from "@nestjs/common";
import {UsecasesModule} from "../../usecases/usecases.module";
import {UserController} from "./user/user.controller";
import {ShopController} from "./shop/shop.controller";
import {ShopUserController} from "./shop-user/shop-user.controller";
import {CurrencyController} from "./currency/currency.controller";
import {ProductController} from "./product/product.controller";
import {ProductPriceController} from "./product-price/product-price.controller";
import {OrderController} from "./order/order.controller";
import {OrderProductPriceController} from "./order-product-price/order-product-price.controller";
import {InvoiceController} from "./invoice/invoice.controller";
import {WalletController} from "./wallet/wallet.controller";
import {ChainController} from "./chain/chain.controller";
import {AssetController} from "./asset/asset.controller";
import {WalletAddressController} from "./wallet-address/wallet-address.controller";
import {AddressAssetController} from "./address-asset/address-asset.controller";
import {ConversionRateController} from "./conversion-rate/conversion-rate.controller";
import {PaymentController} from "./payment/payment.controller";
import {AcquisitionController} from "./acquisition/acquisition.controller";
import {SettlementController} from "./settlement/settlement.controller";
import {ShopWalletAddressController} from "./shop-wallet-address/shop-wallet-address.controller";
import {TransferController} from "./transfer/transfer.controller";
import {RoleController} from "./role/role.controller";

@Module({
    imports: [UsecasesModule],
    providers: [],
    controllers: [
        HealthController,
        UserController,
        ShopController,
        ShopUserController,
        CurrencyController,
        ProductController,
        ProductPriceController,
        OrderController,
        OrderProductPriceController,
        InvoiceController,
        WalletController,
        ChainController,
        AssetController,
        WalletAddressController,
        AddressAssetController,
        ConversionRateController,
        PaymentController,
        AcquisitionController,
        SettlementController,
        ShopWalletAddressController,
        TransferController,
        RoleController
    ],
})
export class ControllersModule {
}
