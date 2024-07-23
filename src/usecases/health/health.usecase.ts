import {HealthRepositoryInterface} from "../../domain/repositories/health_repository.interface";
import {Inject, Injectable} from "@nestjs/common";
import {HealthM} from "../../domain/model/health";
import {IException} from "../../domain/exceptions/exceptions.interface";
import {BaseM} from "../../domain/model/base";

@Injectable()
export class HealthUsecase {
    constructor(
        @Inject('HEALTH_REPOSITORY')
        private readonly healthRepository: HealthRepositoryInterface,
        @Inject('EXCEPTIONS')
        private readonly exceptions: IException
    ) {
    }

    async readById(id: number) {
        const health = await this.healthRepository.findById(id)
        if (!health) {
            this.exceptions.notFoundException({resource: 'health', details: {id}})
        }
        return health
    }

    async create(health: Omit<HealthM, keyof BaseM>): Promise<HealthM> {
        return await this.healthRepository.insert(health)
    }
}