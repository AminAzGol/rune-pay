import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {ChainUsecase} from "../../../usecases/chain/chain.usecase";
import {CreateChainDto, UpdateChainDto} from "./chain.dto";

@Injectable()
@Controller('chain')

export class ChainController {

    constructor(
        private readonly chainUsecase: ChainUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateChainDto) {
        return await this.chainUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.chainUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.chainUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateChainDto) {
        return await this.chainUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.chainUsecase.delete(id)
    }
}