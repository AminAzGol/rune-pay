import {Controller, Get, Injectable} from "@nestjs/common";
import {HealthUsecase} from "../../../usecases/health/health.usecase";

@Controller('health')
@Injectable()
export class HealthController {
    constructor(
        private readonly healthUsecase: HealthUsecase
    ) {
    }

    @Get('/')
    async getHealth() {
        return this.healthUsecase.readById(1)
    }
}