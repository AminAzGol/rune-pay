import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {SettlementUsecase} from "../../../usecases/settlement/settlement.usecase";
import {CreateSettlementDto, UpdateSettlementDto} from "./settlement.dto";

@Injectable()
@Controller('settlement')

export class SettlementController {

    constructor(
        private readonly settlementUsecase: SettlementUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateSettlementDto) {
        return await this.settlementUsecase.createSettlement(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.settlementUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.settlementUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateSettlementDto) {
        return await this.settlementUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.settlementUsecase.delete(id)
    }
}