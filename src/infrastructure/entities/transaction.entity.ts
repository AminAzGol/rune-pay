import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {TxParty} from "../../domain/types/chain-manager/tx-party.type";
import {WalletAddressEntity} from "./wallet-address.entity";
import {AssetEntity} from "./asset.entity";

@Entity('transaction')
export class TransactionEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    walletAddressId: number
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
    @Column('date', {nullable: true})
    date: Date | null

    @ManyToOne(() => WalletAddressEntity)
    walletAddress: WalletAddressEntity

    @ManyToOne(() => AssetEntity)
    associatedAsset: AssetEntity

    constructor() {
        super();
    }
}