import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ProductPriceEntity} from "./product-price.entity";
import {OrderEntity} from "./order.entity";

@Entity('order_product_price')
export class OrderProductPriceEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    productPriceId: number
    @Column('integer', {nullable: false})
    orderId: number
    @ManyToOne(() => ProductPriceEntity)
    productPrice: ProductPriceEntity
    @ManyToOne(() => OrderEntity)
    order: OrderEntity
}