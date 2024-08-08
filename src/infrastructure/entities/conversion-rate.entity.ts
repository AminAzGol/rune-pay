import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('conversion_rate')
export class ConversionRateEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    assetId: number
    @Column('integer', {nullable: false})
    currencyId: number
    @Column('integer', {nullable: false})
    rate: number
    @Column('date', {nullable: false})
    expiresAt: Date

    constructor() {
        super();
    }
}