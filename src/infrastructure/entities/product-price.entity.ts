import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('product_price')
export class ProductPriceEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    productId: number
    @Column('integer', {nullable: false})
    price: number
    @Column('integer', {nullable: false})
    currencyId: number
    @Column('boolean', {nullable: false})
    isActive: boolean

    constructor() {
        super();
    }
}