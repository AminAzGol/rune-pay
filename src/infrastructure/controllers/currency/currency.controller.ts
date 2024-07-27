import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {CurrencyUsecase} from "../../../usecases/currency/currency.usecase";
import {CreateCurrencyDto} from "./currency.dto";

@Controller('currency')
@Injectable()
export class CurrencyController {
    constructor(
        private readonly currencyUsecase: CurrencyUsecase
    ) {
    }

    @Post('/')
    async createCurrency(@Body() input: CreateCurrencyDto) {
        return await this.currencyUsecase.create(input)
    }

    @Get('/')
    async getAllCurrencies() {
        return await this.currencyUsecase.readAll()
    }

    @Delete('/:id')
    async deleteCurrency(@Param('id', ParseIntPipe) id: number) {
        return await this.currencyUsecase.delete(id)
    }
}
