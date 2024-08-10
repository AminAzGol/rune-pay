import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ShopWalletAddressEntity} from "./shop-wallet-address.entity";
import {AssetEntity} from "./asset.entity";
import {SettlementEntity} from "./settlement.entity";

@Entity('transfer')
export class TransferEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    settlementId: number
    @Column('integer', {nullable: false})
    shopWalletAddressId: number
    @Column('integer', {nullable: false})
    amount: number
    @Column('integer', {nullable: false})
    assetId: number
    @ManyToOne(() => ShopWalletAddressEntity)
    shopWalletAddress: ShopWalletAddressEntity
    @ManyToOne(() => AssetEntity)
    asset: AssetEntity
    @ManyToOne(() => SettlementEntity)
    settlement: SettlementEntity

    constructor() {
        super();
    }
}