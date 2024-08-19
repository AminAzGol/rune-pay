import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {RoleM} from "../../../domain/model/role";
import {Repository} from "typeorm";
import {RoleEntity} from "../../entities/role.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RoleRepository extends BaseRepository<RoleM> {

    constructor(@InjectRepository(RoleEntity) entityRepository: Repository<RoleEntity>) {
        super(entityRepository);
    }
}