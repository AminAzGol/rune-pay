import {Body, Controller, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
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

    @Put('/:id/renew')
    async renew(@Param('id', ParseIntPipe) id: number) {
        return await this.paymentUsecase.renew(id)
    }
}