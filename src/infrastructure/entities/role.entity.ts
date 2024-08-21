import {Column, Entity, ManyToOne} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {RoleEnum} from "../../domain/enum/role.enum";
import {ShopEntity} from "./shop.entity";
import {UserEntity} from "./user.entity";

@Entity('role')
export class RoleEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    userId: number
    @Column('integer', {nullable: false})
    shopId: number
    @Column('enum', {enum: RoleEnum, nullable: false})
    role: RoleEnum

    @ManyToOne(() => UserEntity)
    user: UserEntity
    @ManyToOne(() => ShopEntity)
    shop: ShopEntity

    constructor() {
        super();
    }
}