import {Controller, Get, Injectable, Param, ParseIntPipe} from "@nestjs/common";
import {TransactionUsecase} from "../../../usecases/transaction/transaction.usecase";

@Injectable()
@Controller('transaction')

export class TransactionController {

    constructor(
        private readonly transactionUsecase: TransactionUsecase
    ) {
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.transactionUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.transactionUsecase.readAll()
    }

}