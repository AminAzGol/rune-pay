import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('currency')
export class CurrencyEntity extends BaseAbstractEntity {
    @Column('varchar', {length: 255, nullable: false})

    name: string
}