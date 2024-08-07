import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {AddressAssetUsecase} from "../../../usecases/address-asset/address-asset.usecase";
import {CreateAddressAssetDto} from "./address-asset.dto";

@Injectable()
@Controller('address-asset')
export class AddressAssetController {

    constructor(
        private readonly addressAssetUsecase: AddressAssetUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateAddressAssetDto) {
        return await this.addressAssetUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.addressAssetUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.addressAssetUsecase.readAll()
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.addressAssetUsecase.delete(id)
    }
}