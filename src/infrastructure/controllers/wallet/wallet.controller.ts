import {Controller, Delete, Get, Injectable, Param, ParseIntPipe} from "@nestjs/common";
import {WalletUsecase} from "../../../usecases/wallet/wallet.usecase";

@Injectable()
@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletUsecase: WalletUsecase
    ) {
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