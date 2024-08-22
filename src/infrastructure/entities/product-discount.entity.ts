import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ProductEntity} from "./product.entity";
import {ShopEntity} from "./shop.entity";
import {ProductDiscountTypeEnum} from "../../domain/enum/product-discount-type.enum";

@Entity('product_discount')
export class ProductDiscountEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    productId: number
    @Column('enum', {enum: ProductDiscountTypeEnum, nullable: false})
    type: ProductDiscountTypeEnum
    discountUnit: string
    @Column('integer', {nullable: false})
    discountValue: number
    @Column('varchar', {nullable: false})
    couponCode: string
    @Column('timestamp', {nullable: true})
    expiresAt: Date
    @Column('boolean', {nullable: false})
    isRedeemableAllowed: boolean
    @ManyToOne(() => ProductEntity)
    product: ProductEntity
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
}