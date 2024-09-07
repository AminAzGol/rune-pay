import {Controller, Injectable} from "@nestjs/common";
import {SettlementUsecase} from "../../../usecases/settlement/settlement.usecase";

@Injectable()
@Controller('settlement')

export class SettlementController {

    constructor(
        private readonly settlementUsecase: SettlementUsecase
    ) {
    }

}