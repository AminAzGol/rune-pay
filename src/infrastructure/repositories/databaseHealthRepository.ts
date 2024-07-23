import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HealthEntity} from "../entities/health.entity";
import {HealthRepositoryInterface} from "../../domain/repositories/health_repository.interface";
import {HealthM} from "../../domain/model/health";
import {BaseM} from "../../domain/model/base";


export class DatabaseHealthRepository implements HealthRepositoryInterface {

    constructor(
        @InjectRepository(HealthEntity)
        private readonly healthEntityRepository: Repository<HealthEntity>,
    ) {
    }

    async insert(input: Omit<HealthM, keyof BaseM>): Promise<HealthM> {
        const result = await this.healthEntityRepository.insert(input)
        return await this.findById(result.identifiers[0].id)
    }

    async findById(id: number): Promise<HealthM> {
        const result = await this.healthEntityRepository.findOne({where: {id}})
        return result as HealthM
    }
}