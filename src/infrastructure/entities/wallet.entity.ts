import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('wallet')
export class WalletEntity extends BaseAbstractEntity {
    @Column('jsonb', {nullable: false})
    keystore: any
    @Column('boolean', {nullable: false, default: false})
    acquired: boolean
}