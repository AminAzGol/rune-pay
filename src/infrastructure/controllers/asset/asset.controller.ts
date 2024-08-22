import {Controller, Delete, Get, Injectable, Param, ParseIntPipe} from "@nestjs/common";
import {AssetUsecase} from "../../../usecases/asset/asset.usecase";

@Injectable()
@Controller('asset')

export class AssetController {

    constructor(
        private readonly assetUsecase: AssetUsecase
    ) {
    }

    // @Post('/')
    // async create(@Body() input: CreateAssetDto) {
    //     return await this.assetUsecase.create(input)
    // }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.assetUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.assetUsecase.readAll()
    }


    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.assetUsecase.delete(id)
    }
}