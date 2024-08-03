import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {OrderProductPriceUsecase} from "../../../usecases/order-product-price/order-product-price.usecase";
import {CreateOrderProductPriceDto} from "./order-product-price.dto";

@Injectable()
@Controller('order-product-price')

export class OrderProductPriceController {

    constructor(
        private readonly orderProductPriceUsecase: OrderProductPriceUsecase
    ) {
    }

    @Post('/')
    async createProduct(@Body() input: CreateOrderProductPriceDto) {
        return await this.orderProductPriceUsecase.create(input)
    }

    @Get('/:id')
    async getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.orderProductPriceUsecase.readById(id)
    }

    @Get('/')
    async getAllProducts() {
        return await this.orderProductPriceUsecase.readAll()
    }


    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.orderProductPriceUsecase.delete(id)
    }
}