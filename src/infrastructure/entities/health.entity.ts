import {Column, Entity} from "typeorm";
import {BaseAbstractEntity} from "./base.entity";
import {HealthEnum} from "../../domain/enum/health.enum";


@Entity({name: 'health'})
export class HealthEntity extends BaseAbstractEntity {
    @Column({
        type: 'enum',
        enum: HealthEnum,
        nullable: false,
    })
    health: string;
}