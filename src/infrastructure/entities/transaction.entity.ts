import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('transaction')
export class TransactionEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    acquisitionId: number

    @Column('integer', {nullable: false})
    amount: number
    @Column('integer', {nullable: false})
    confirmations: number
    @Column('integer', {nullable: false})
    minConfirmations: number
    @Column('varchar', {length: 255, nullable: false})
    hash: string
    @Column('varchar', {length: 255, nullable: false})
    from: string
    @Column('varchar', {length: 255, nullable: false})
    assetTicker: string
    @Column('boolean', {nullable: false})
    assetsMatch: boolean

    constructor() {
        super();
    }
}