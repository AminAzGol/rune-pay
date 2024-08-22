import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Put} from "@nestjs/common";
import {AcquisitionUsecase} from "../../../usecases/acquisition/acquisition.usecase";
import {UpdateAcquisitionDto} from "./acquisition.dto";

@Injectable()
@Controller('acquisition')

export class AcquisitionController {

    constructor(
        private readonly acquisitionUsecase: AcquisitionUsecase
    ) {
    }

    // @Post('/')
    // async create(@Body() input: CreateAcquisitionDto) {
    //     return await this.acquisitionUsecase.create(input)
    // }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.acquisitionUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.acquisitionUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateAcquisitionDto) {
        return await this.acquisitionUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.acquisitionUsecase.delete(id)
    }
}