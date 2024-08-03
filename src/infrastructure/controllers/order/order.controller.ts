import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {OrderUsecase} from "../../../usecases/order/order.usecase";
import {CreateOrderDto, UpdateOrderDto} from "./order.dto";

@Injectable()
@Controller('order')

export class OrderController {

    constructor(
        private readonly orderUsecase: OrderUsecase
    ) {
    }

    @Post('/')
    async createProduct(@Body() input: CreateOrderDto) {
        return await this.orderUsecase.create(input)
    }

    @Get('/:id')
    async getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.orderUsecase.readById(id)
    }

    @Get('/')
    async getAllProducts() {
        return await this.orderUsecase.readAll()
    }

    @Put('/:id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateOrderDto) {
        return await this.orderUsecase.update(id, input)
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.orderUsecase.delete(id)
    }
}