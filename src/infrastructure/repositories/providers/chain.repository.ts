import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ChainM} from "../../../domain/model/chain";
import {Repository} from "typeorm";
import {ChainEntity} from "../../entities/chain.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ChainRepository extends BaseRepository<ChainM> {

    constructor(@InjectRepository(ChainEntity) entityRepository: Repository<ChainEntity>) {
        super(entityRepository);
    }

    async findByName(name: string): Promise<ChainM> {
        return this.entityRepository.findOne({
            where: {
                name
            }
        })
    }
}