import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity('address_asset')
export class AddressAssetEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    assetId: number
    @Column('integer', {nullable: false})
    addressId: number

    constructor() {
        super();
    }
}