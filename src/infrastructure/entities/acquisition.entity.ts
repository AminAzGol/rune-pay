import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {AcquisitionStateEnum} from "../../domain/enum/acquisition-state.enum";
import {AddressAssetEntity} from "./address-asset.entity";
import {WalletEntity} from "./wallet.entity";

@Entity('acquisition')
export class AcquisitionEntity extends BaseAbstractEntity {
    @Column('integer', {nullable: false})
    addressAssetId: number

    @Column('enum', {enum: AcquisitionStateEnum, nullable: false})
    state: AcquisitionStateEnum

    @Column('integer', {nullable: false})
    acquiredWalletId: number

    @ManyToOne(() => AddressAssetEntity)
    addressAsset: AddressAssetEntity
    @ManyToOne(() => WalletEntity)
    acquiredWallet: WalletEntity

    constructor() {
        super();
    }
}