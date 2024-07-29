import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {OrderStatusEnum} from "../../domain/enum/order-status.enum";
import {ShopEntity} from "./shop.entity";

@Entity('order')
export class OrderEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    totalPrice: number
    @Column('varchar', {nullable: false})
    customerName: string
    @Column('varchar', {nullable: false})
    customerAddress: string
    @Column('varchar', {nullable: false})
    customerEmail: string
    @Column('enum', {enum: OrderStatusEnum, nullable: false})
    status: OrderStatusEnum
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
}