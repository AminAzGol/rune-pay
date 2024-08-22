import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ChainEntity} from "./chain.entity";

@Entity('asset')
export class AssetEntity extends BaseAbstractEntity {
    @Column('varchar', {length: 255, nullable: false})
    name: string
    @Column('integer', {nullable: false})
    chainId: number
    @Column('varchar', {length: 255, nullable: true})
    contractAddress: string
    @Column('boolean', {nullable: false, default: true})
    isActive: boolean;
    @ManyToOne(() => ChainEntity)
    chain: ChainEntity

    constructor() {
        super();
    }
}