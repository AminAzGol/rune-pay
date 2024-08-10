import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {ShopWalletAddressUsecase} from "../../../usecases/shop-wallet-address/shop-wallet-address.usecase";
import {CreateShopWalletAddressDto, UpdateShopWalletAddressDto} from "./shop-wallet-address.dto";

@Injectable()
@Controller('shop-wallet-address')

export class ShopWalletAddressController {

    constructor(
        private readonly shopWalletAddressUsecase: ShopWalletAddressUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateShopWalletAddressDto) {
        return await this.shopWalletAddressUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.shopWalletAddressUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.shopWalletAddressUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateShopWalletAddressDto) {
        return await this.shopWalletAddressUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.shopWalletAddressUsecase.delete(id)
    }
}