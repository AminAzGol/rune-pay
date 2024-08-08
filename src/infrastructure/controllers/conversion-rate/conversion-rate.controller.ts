import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {ConversionRateUsecase} from "../../../usecases/conversion-rate/conversion-rate.usecase";
import {CreateConversionRateDto, UpdateConversionRateDto} from "./conversion-rate.dto";

@Injectable()
@Controller('conversion-rate')

export class ConversionRateController {

    constructor(
        private readonly conversionRateUsecase: ConversionRateUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateConversionRateDto) {
        return await this.conversionRateUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.conversionRateUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.conversionRateUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateConversionRateDto) {
        return await this.conversionRateUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.conversionRateUsecase.delete(id)
    }
}