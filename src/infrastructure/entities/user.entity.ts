import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";

@Entity({name: 'user'})
export class UserEntity extends BaseAbstractEntity {
    @Column('varchar', {length: 255, nullable: false, unique: true})
    email: string;
    @Column('varchar', {select: false})
    password: string;
}
