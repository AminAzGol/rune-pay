import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {CurrencyEntity} from "./currency.entity";
import {AssetEntity} from "./asset.entity";
import {InvoiceEntity} from "./invoice.entity";
import {ShopEntity} from "./shop.entity";
import {ConversionRateEntity} from "./conversion-rate.entity";
import {AcquisitionEntity} from "./acquisition.entity";

@Entity('payment')
export class PaymentEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    invoiceId: number
    @Column('integer', {nullable: false})
    baseCurrencyId: number
    @Column('varchar', {nullable: false})
    baseAmount: string
    @Column('integer', {nullable: false})
    payAssetId: number
    @Column('varchar', {nullable: false})
    payAmount: string
    @Column('integer', {nullable: false})
    conversionRateId: number
    @Column('enum', {enum: PaymentStatusEnum, nullable: false})
    status: PaymentStatusEnum
    @Column('timestamp', {nullable: false})
    expiresAt: Date
    @Column('integer', {nullable: false})
    acquisitionId: number
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToOne(() => InvoiceEntity)
    invoice: InvoiceEntity
    @ManyToOne(() => ConversionRateEntity)
    conversionRate: ConversionRateEntity
    @ManyToOne(() => CurrencyEntity)
    baseCurrency: CurrencyEntity
    @ManyToOne(() => AssetEntity)
    payAsset: AssetEntity
    @ManyToOne(() => AcquisitionEntity)
    acquisition: AcquisitionEntity

    constructor() {
        super();
    }
}