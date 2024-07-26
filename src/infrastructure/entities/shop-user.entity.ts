import {Column, Entity, ManyToOne} from "typeorm";
import {UserEntity} from "./user.entity";
import {ShopEntity} from "./shop.entity";
import {BaseAbstractEntity} from "./base.entity";

@Entity('user_shop')
export class ShopUserEntity extends BaseAbstractEntity {
    @Column('integer', {nullable: false, unique: false})
    shopId: number
    @Column('integer', {nullable: false, unique: false})
    userId: number

    @ManyToOne(() => UserEntity)
    user: UserEntity

    @ManyToOne(() => ShopEntity)
    shop: ShopEntity
}