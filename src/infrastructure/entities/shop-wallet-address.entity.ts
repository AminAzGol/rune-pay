import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {ShopEntity} from "./shop.entity";
import {AssetEntity} from "./asset.entity";

@Entity('shop_wallet_address')
export class ShopWalletAddressEntity extends BaseAbstractEntity {

    @Column('varchar', {length: 255, nullable: false})
    address: string
    @Column('integer', {nullable: false})
    shopId: number
    @Column('integer', {nullable: false})
    assetId: number
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
    @ManyToOne(() => AssetEntity)
    asset: AssetEntity

    constructor() {
        super();
    }
}