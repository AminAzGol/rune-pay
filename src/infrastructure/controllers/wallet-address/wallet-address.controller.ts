import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {WalletAddressUsecase} from "../../../usecases/wallet-address/wallet-address.usecase";
import {CreateWalletAddressDto} from "./wallet-address.dto";

@Injectable()
@Controller('wallet-address')

export class WalletAddressController {

    constructor(
        private readonly walletAddressUsecase: WalletAddressUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateWalletAddressDto) {
        return await this.walletAddressUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.walletAddressUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.walletAddressUsecase.readAll()
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.walletAddressUsecase.delete(id)
    }
}