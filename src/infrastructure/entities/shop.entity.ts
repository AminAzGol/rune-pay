import {BaseAbstractEntity} from "./base.entity";
import {Column, Entity} from "typeorm";

@Entity({name: 'shop'})
export class ShopEntity extends BaseAbstractEntity {
    @Column('varchar', {length: 255, nullable: false, unique: true})
    name: string
}