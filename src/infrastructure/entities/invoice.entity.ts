import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ShopEntity} from "./shop.entity";
import {CurrencyEntity} from "./currency.entity";
import {OrderEntity} from "./order.entity";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";

@Entity('invoice')
export class InvoiceEntity extends BaseAbstractEntity {
    @Column('integer', {nullable: true})
    orderId: number
    @Column('integer', {nullable: false})
    currencyId: number
    @Column('integer', {nullable: false})
    shopId: number
    @Column('varchar', {length: 255, nullable: false})
    amount: string
    @Column('enum', {enum: InvoiceStatusEnum, nullable: false})
    status: InvoiceStatusEnum
    @Column('timestamp', {nullable: false})
    expiresAt: Date
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToOne(() => CurrencyEntity)
    currency: CurrencyEntity
    @ManyToOne(() => OrderEntity, {nullable: true})
    order: OrderEntity

}