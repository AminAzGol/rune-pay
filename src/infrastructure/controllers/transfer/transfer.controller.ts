import {Controller, Injectable} from "@nestjs/common";
import {TransferUsecase} from "../../../usecases/transfer/transfer.usecase";

@Injectable()
@Controller('transfer')

export class TransferController {

    constructor(
        private readonly transferUsecase: TransferUsecase
    ) {
    }
}