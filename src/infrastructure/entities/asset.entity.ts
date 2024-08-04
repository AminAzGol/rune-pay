import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ChainEntity} from "./chain.entity";

@Entity('asset')
export class AssetEntity extends BaseAbstractEntity {

    @Column('varchar', {length: 255, nullable: false})
    ticker: string
    @Column('integer', {nullable: false})
    chainId: number

    @ManyToOne(() => ChainEntity)
    chain: ChainEntity

    constructor() {
        super();
    }
}