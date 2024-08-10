import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigModule} from "../common/typeorm/typeorm-config.module";
import {HealthRepository} from "./providers/health.repository";
import {HealthEntity} from "../entities/health.entity";
import {UserEntity} from "../entities/user.entity";
import {UserRepository} from "./providers/user.repository";
import {CryptographyModule} from "../services/cryptography/cryptography.module";
import {ShopEntity} from "../entities/shop.entity";
import {ShopRepository} from "./providers/shop.repository";
import {ShopUserEntity} from "../entities/shop-user.entity";
import {ShopUserRepository} from "./providers/shop-user.repository";
import {CurrencyRepository} from "./providers/currency.repository";
import {CurrencyEntity} from "../entities/currency.entity";
import {ProductEntity} from "../entities/product.entity";
import {ProductRepository} from "./providers/product.repository";
import {ProductPriceRepository} from "./providers/product-price.repository";
import {ProductPriceEntity} from "../entities/product-price.entity";
import {OrderEntity} from "../entities/order.entity";
import {OrderRepository} from "./providers/order.repository";
import {OrderProductPriceRepository} from "./providers/order-product-price.repository";
import {OrderProductPriceEntity} from "../entities/order-product-price.entity";
import {InvoiceRepository} from "./providers/invoice.repository";
import {InvoiceEntity} from "../entities/invoice.entity";
import {WalletEntity} from "../entities/wallet.entity";
import {WalletRepository} from "./providers/wallet.repository";
import {ChainRepository} from "./providers/chain.repository";
import {ChainEntity} from "../entities/chain.entity";
import {AssetEntity} from "../entities/asset.entity";
import {AssetRepository} from "./providers/asset.repository";
import {WalletAddressRepository} from "./providers/wallet-address.repository";
import {WalletAddressEntity} from "../entities/wallet-address.entity";
import {AddressAssetRepository} from "./providers/address-asset.repository";
import {AddressAssetEntity} from "../entities/address-asset.entity";
import {ConversionRateRepository} from "./providers/conversion-rate.repository";
import {ConversionRateEntity} from "../entities/conversion-rate.entity";
import {PaymentEntity} from "../entities/payment.entity";
import {PaymentRepository} from "./providers/payment.repository";
import {AcquisitionRepository} from "./providers/acquisition.repository";
import {AcquisitionEntity} from "../entities/acquisition.entity";
import {TransactionEntity} from "../entities/transaction.entity";
import {TransactionRepository} from "./providers/transaction.repository";
import {SettlementRepository} from "./providers/settlement.repository";
import {SettlementEntity} from "../entities/settlement.entity";
import {TransferEntity} from "../entities/transfer.entity";
import {ShopWalletAddressEntity} from "../entities/shop-wallet-address.entity";
import {TransferRepository} from "./providers/transfer.repository";
import {ShopWalletAddressRepository} from "./providers/shop-wallet-address.repository";

@Module({
    imports: [
        CryptographyModule,
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([
            HealthEntity,
            UserEntity,
            ShopEntity,
            ShopUserEntity,
            CurrencyEntity,
            ProductEntity,
            ProductPriceEntity,
            OrderEntity,
            OrderProductPriceEntity,
            InvoiceEntity,
            WalletEntity,
            ChainEntity,
            AssetEntity,
            WalletAddressEntity,
            AddressAssetEntity,
            ConversionRateEntity,
            PaymentEntity,
            AcquisitionEntity,
            TransactionEntity,
            SettlementEntity,
            TransferEntity,
            ShopWalletAddressEntity
        ]),
    ],
    providers: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository,
        ShopRepository,
        ShopUserRepository,
        CurrencyRepository,
        ProductRepository,
        ProductPriceRepository,
        OrderRepository,
        OrderProductPriceRepository,
        InvoiceRepository,
        WalletRepository,
        ChainRepository,
        AssetRepository,
        WalletAddressRepository,
        AddressAssetRepository,
        ConversionRateRepository,
        PaymentRepository,
        AcquisitionRepository,
        TransactionRepository,
        SettlementRepository,
        TransferRepository,
        ShopWalletAddressRepository
    ],
    exports: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository,
        ShopRepository,
        ShopUserRepository,
        CurrencyRepository,
        ProductRepository,
        ProductPriceRepository,
        OrderRepository,
        OrderProductPriceRepository,
        InvoiceRepository,
        WalletRepository,
        ChainRepository,
        AssetRepository,
        WalletAddressRepository,
        AddressAssetRepository,
        ConversionRateRepository,
        PaymentRepository,
        AcquisitionRepository,
        TransactionRepository,
        SettlementRepository,
        ShopWalletAddressRepository,
        TransferRepository
    ]
})
export class RepositoriesModule {
}