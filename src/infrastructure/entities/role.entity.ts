import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {RoleEnum} from "../../domain/enum/role.enum";

@Entity('role')
export class RoleEntity extends BaseAbstractEntity {

    @Column('integer', {nullable: false})
    userId: number
    @Column('integer', {nullable: false})
    shopId: number
    @Column('enum', {enum: RoleEnum, nullable: false})
    role: RoleEnum

    constructor() {
        super();
    }
}