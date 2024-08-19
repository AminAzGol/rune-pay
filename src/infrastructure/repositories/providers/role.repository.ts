import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {RoleM} from "../../../domain/model/role";
import {Repository} from "typeorm";
import {RoleEntity} from "../../entities/role.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ShopM} from "../../../domain/model/shop";

@Injectable()
export class RoleRepository extends BaseRepository<RoleM> {

    constructor(@InjectRepository(RoleEntity) entityRepository: Repository<RoleEntity>) {
        super(entityRepository);
    }

    async findAllRolesByUserIdWithShop(userId: number): Promise<(RoleM & { shop: ShopM })[]> {
        const result = await this.entityRepository.find({
            where: {userId},
            relations: {
                shop: true,
            }
        })
        return result as (RoleM & { shop: ShopM })[]
    }
}