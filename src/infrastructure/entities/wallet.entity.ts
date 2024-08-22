import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('wallet')
export class WalletEntity extends BaseAbstractEntity {
    @Column('text', {nullable: false})
    keystore: string
    @Column('boolean', {nullable: false, default: false})
    acquired: boolean
}