import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {AssetEntity} from "./asset.entity";
import {CurrencyEntity} from "./currency.entity";

@Entity('conversion_rate')
export class ConversionRateEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    assetId: number
    @Column('integer', {nullable: false})
    currencyId: number
    @Column('double precision', {nullable: false})
    rate: number
    @Column('date', {nullable: false})
    expiresAt: Date

    @ManyToOne(() => AssetEntity)
    asset: AssetEntity
    @ManyToOne(() => CurrencyEntity)
    currency: CurrencyEntity

    constructor() {
        super();
    }
}