import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('chain')
export class ChainEntity extends BaseAbstractEntity {
    @Column('varchar', {length: 255, nullable: false})
    name: string
}