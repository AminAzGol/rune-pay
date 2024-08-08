import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {PaymentUsecase} from "../../../usecases/payment/payment.usecase";
import {CreatePaymentDto} from "./payment.dto";

@Injectable()
@Controller('payment')

export class PaymentController {

    constructor(
        private readonly paymentUsecase: PaymentUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreatePaymentDto) {
        return await this.paymentUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.paymentUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.paymentUsecase.readAll()
    }


    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.paymentUsecase.delete(id)
    }
}