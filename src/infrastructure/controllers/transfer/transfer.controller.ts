import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {TransferUsecase} from "../../../usecases/transfer/transfer.usecase";
import {CreateTransferDto} from "./transfer.dto";

@Injectable()
@Controller('transfer')

export class TransferController {

    constructor(
        private readonly transferUsecase: TransferUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateTransferDto) {
        return await this.transferUsecase.createTransfer(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.transferUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.transferUsecase.readAll()
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.transferUsecase.delete(id)
    }
}