import {Column, Entity, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {CurrencyEntity} from "./currency.entity";
import {AssetEntity} from "./asset.entity";
import {InvoiceEntity} from "./invoice.entity";
import {ShopEntity} from "./shop.entity";
import {ConversionRateEntity} from "./conversion-rate.entity";
import {AcquisitionEntity} from "./acquisition.entity";
import {SettlementEntity} from "./settlement.entity";

@Entity('payment')
export class PaymentEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    invoiceId: number
    @Column('integer', {nullable: false})
    baseCurrencyId: number
    @Column('integer', {nullable: false})
    baseAmount: number
    @Column('integer', {nullable: false})
    payAssetId: number
    @Column('integer', {nullable: false})
    payAmount: number
    @Column('integer', {nullable: false})
    conversionRateId: number
    @Column('enum', {enum: PaymentStatusEnum, nullable: false})
    status: PaymentStatusEnum
    @Column('date', {nullable: false})
    expiresAt: Date
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
    @OneToMany(() => AcquisitionEntity, (acquisition) => acquisition.payment)
    acquisitions: AcquisitionEntity[]

    @ManyToMany(() => SettlementEntity, (settlement) => settlement.payments, {cascade: false})
    settlements: SettlementEntity[]

    constructor() {
        super();
    }
}