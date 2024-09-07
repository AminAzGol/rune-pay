import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {SettlementStatusEnum} from "../../domain/enum/settlement-status.enum";
import {AssetEntity} from "./asset.entity";
import {ShopEntity} from "./shop.entity";
import {PaymentEntity} from "./payment.entity";
import {SettlementTypeEnum} from "../../domain/enum/settlement-type.enum";
import {AcquisitionEntity} from "./acquisition.entity";
import {InvoiceEntity} from "./invoice.entity";
import {ShopWalletAddressEntity} from "./shop-wallet-address.entity";

@Entity('settlement')
export class SettlementEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    invoiceId: number
    @Column('integer', {nullable: false})
    paymentId: number
    @Column('integer', {nullable: false})
    acquisitionId: number
    @Column('varchar', {length: 255, nullable: false})
    paymentAmount: string
    @Column('integer', {nullable: false})
    paymentAssetId: number
    @Column('integer', {nullable: false})
    settlementAssetId: number
    @Column('integer', {nullable: true})
    shopWalletAddressId: number
    @Column('enum', {enum: SettlementStatusEnum, nullable: false})
    status: SettlementStatusEnum
    @Column('enum', {enum: SettlementTypeEnum, nullable: false})
    type: SettlementTypeEnum

    @ManyToOne(() => AssetEntity)
    paymentAsset: AssetEntity
    @ManyToOne(() => AssetEntity)
    settlementAsset: AssetEntity
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToOne(() => InvoiceEntity)
    invoice: InvoiceEntity
    @ManyToOne(() => PaymentEntity)
    payment: PaymentEntity
    @ManyToOne(() => AcquisitionEntity)
    acquisition: AcquisitionEntity
    @ManyToOne(() => ShopWalletAddressEntity)
    shopWalletAddress: ShopWalletAddressEntity

    constructor() {
        super();
    }
}