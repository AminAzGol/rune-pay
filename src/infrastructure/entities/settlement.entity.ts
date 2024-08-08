import {Column, Entity, JoinTable, ManyToMany, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {SettlementStatusEnum} from "../../domain/enum/settlement-status.enum";
import {AssetEntity} from "./asset.entity";
import {ShopEntity} from "./shop.entity";
import {PaymentEntity} from "./payment.entity";

@Entity('settlement')
export class SettlementEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    addressAssetId: number
    @Column('integer', {nullable: false})
    totalPaymentsAmount: number
    @Column('integer', {nullable: false})
    paymentAssetId: number
    @Column('integer', {nullable: false})
    settlementAssetId: number
    @Column('integer', {nullable: false})
    settlementAmount: number
    @Column('enum', {enum: SettlementStatusEnum, nullable: false})
    status: SettlementStatusEnum
    @ManyToOne(() => AssetEntity)
    paymentAsset: AssetEntity
    @ManyToOne(() => AssetEntity)
    settlementAsset: AssetEntity
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToMany(() => PaymentEntity, (payment) => payment.settlements, {cascade: true})
    //@ManyToMany(() => PaymentEntity)
    @JoinTable()
    payments: PaymentEntity[]

    constructor() {
        super();
    }
}