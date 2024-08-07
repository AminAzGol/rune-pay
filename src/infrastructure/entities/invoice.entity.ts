import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ShopEntity} from "./shop.entity";
import {CurrencyEntity} from "./currency.entity";
import {OrderEntity} from "./order.entity";
import {OrderStatusEnum} from "../../domain/enum/order-status.enum";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";

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
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToOne(() => CurrencyEntity)
    currency: CurrencyEntity
    @ManyToOne(() => OrderEntity)
    order: OrderEntity

}