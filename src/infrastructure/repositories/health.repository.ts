import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HealthEntity} from "../entities/health.entity";
import {HealthRepositoryInterface} from "../../domain/repositories/health_repository.interface";
import {HealthM} from "../../domain/model/health";
import {BaseRepository} from "./base.repository";


export class HealthRepository extends BaseRepository<HealthM> implements HealthRepositoryInterface {
    constructor(
        @InjectRepository(HealthEntity)
        private readonly healthEntityRepository: Repository<HealthEntity>,
    ) {
        super(healthEntityRepository)
    }
}