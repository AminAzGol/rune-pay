import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {TransactionUsecase} from "../../../usecases/transaction/transaction.usecase";
import {CreateTransactionDto, UpdateTransactionDto} from "./transaction.dto";

@Injectable()
@Controller('transaction')

export class TransactionController {

    constructor(
        private readonly transactionUsecase: TransactionUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateTransactionDto) {
        return await this.transactionUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.transactionUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.transactionUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateTransactionDto) {
        return await this.transactionUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.transactionUsecase.delete(id)
    }
}