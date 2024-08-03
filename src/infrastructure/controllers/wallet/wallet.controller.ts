import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {WalletUsecase} from "../../../usecases/wallet/wallet.usecase";
import {CreateWalletDto} from "./wallet.dto";

@Injectable()
@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletUsecase: WalletUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateWalletDto) {
        return await this.walletUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.walletUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.walletUsecase.readAll()
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.walletUsecase.delete(id)
    }
}