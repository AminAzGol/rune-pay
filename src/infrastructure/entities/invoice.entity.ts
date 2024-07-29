import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";
import {OrderStatusEnum} from "../../domain/enum/order-status.enum";
import {ShopEntity} from "./shop.entity";
import {CurrencyEntity} from "./currency.entity";
import {OrderEntity} from "./order.entity";

@Entity('invoice')
export class InvoiceEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    orderId: number
    @Column('integer', {nullable: false})
    currencyId: number
    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    amount: number
    @Column('enum', {enum: OrderStatusEnum, nullable: false})
    status: InvoiceStatusEnum
    @Column('integer', {nullable: false})
    addressAssetId: number
    //TODO: add AddressAsset
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToOne(() => CurrencyEntity)
    currency: CurrencyEntity
    @ManyToOne(() => OrderEntity)
    order: OrderEntity

}