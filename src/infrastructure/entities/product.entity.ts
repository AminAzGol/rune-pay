import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ShopEntity} from "./shop.entity";

@Entity('product')
export class ProductEntity extends BaseAbstractEntity {

    @Column('varchar', {length: 255, nullable: false})
    name: string
    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    quantity: number
    @Column('boolean', {nullable: false})
    isActive: boolean
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
}