import {HealthUsecase} from "../../usecases/health/health.usecase";
import {HealthEnum} from "../../domain/enum/health.enum";
import {Injectable} from "@nestjs/common";

@Injectable()
export class HealthSeed {
    constructor(
        private readonly healthUsecase: HealthUsecase
    ) {
    }

    async runHealthSeed() {
        await this.healthUsecase.create({health: HealthEnum.OK})
    }
}