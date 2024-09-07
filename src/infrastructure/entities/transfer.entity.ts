import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {AssetEntity} from "./asset.entity";
import {SettlementEntity} from "./settlement.entity";
import {TransferStatusEnum} from "../../domain/enum/transfer-status.enum";

@Entity('transfer')
export class TransferEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    settlementId: number
    @Column('varchar', {length: 255, nullable: false})
    destination: string
    @Column('varchar', {length: 255, nullable: false})
    amount: string
    @Column('integer', {nullable: false})
    assetId: number
    @Column('varchar', {length: 500, nullable: true})
    hash: string
    @Column('enum', {enum: TransferStatusEnum, nullable: false})
    status: TransferStatusEnum

    @ManyToOne(() => AssetEntity)
    asset: AssetEntity
    @ManyToOne(() => SettlementEntity)
    settlement: SettlementEntity

    constructor() {
        super();
    }
}