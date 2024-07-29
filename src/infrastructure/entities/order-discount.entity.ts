import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {OrderEntity} from "./order.entity";
import {ProductDiscountEntity} from "./product-discount.entity";

@Entity("order-discount")
export class OrderDiscountEntity extends BaseAbstractEntity {
    @Column('integer', {nullable: false})
    orderId: number
    @Column('integer', {nullable: false})
    productDiscountId: number
    @ManyToOne(() => OrderEntity)
    order: OrderEntity
    @ManyToOne(() => ProductDiscountEntity)
    productDiscount: ProductDiscountEntity
}