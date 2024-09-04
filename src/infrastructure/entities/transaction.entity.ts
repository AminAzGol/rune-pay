import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {TxParty} from "../../domain/types/chain-manager/tx-party.type";
import {WalletAddressEntity} from "./wallet-address.entity";
import {AssetEntity} from "./asset.entity";
import {TxPartySideEnum} from "../../domain/enum/tx-party-side.enum";

@Entity('transaction')
export class TransactionEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: true})
    acquisitionId?: number
    @Column('integer', {nullable: false})
    walletAddressId: number
    @Column('enum', {enum: TxPartySideEnum, nullable: true})
    walletAddressSide: TxPartySideEnum
    @Column('integer', {nullable: true})
    associatedAssetId: number
    @Column('varchar', {length: 255, nullable: false})
    amountReceived: string
    @Column('integer', {nullable: false})
    confirmations: number
    @Column('varchar', {length: 255, nullable: false})
    hash: string
    @Column('jsonb', {nullable: false})
    from: TxParty
    @Column('jsonb', {nullable: false})
    to: TxParty
    @Column('varchar', {length: 255, nullable: false})
    assetName: string
    @Column('timestamp', {nullable: true})
    timestamp: Date | null

    @ManyToOne(() => WalletAddressEntity)
    walletAddress: WalletAddressEntity

    @ManyToOne(() => AssetEntity)
    associatedAsset: AssetEntity

    constructor() {
        super();
    }
}