import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {SettlementM} from "../../../domain/model/settlement";
import {Repository} from "typeorm";
import {SettlementEntity} from "../../entities/settlement.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BaseM} from "../../../domain/model/base";

@Injectable()
export class SettlementRepository extends BaseRepository<SettlementM> {

    constructor(@InjectRepository(SettlementEntity) entityRepository: Repository<SettlementEntity>) {
        super(entityRepository);
    }

    async insert(input: Omit<SettlementM, keyof BaseM>) {
        return this.entityRepository.save(input)
    }
}