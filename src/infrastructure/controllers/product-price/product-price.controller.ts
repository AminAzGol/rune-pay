import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {ProductPriceUsecase} from "../../../usecases/product-price/product-price.usecase";
import {CreateProductPriceDto, UpdateProductPriceDto} from "./product-price.dto";

@Injectable()
@Controller('product-price')

export class ProductPriceController {

    constructor(
        private readonly productPriceUsecase: ProductPriceUsecase
    ) {
    }

    @Post('/')
    async createProduct(@Body() input: CreateProductPriceDto) {
        return await this.productPriceUsecase.create(input)
    }

    @Get('/:id')
    async getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productPriceUsecase.readById(id)
    }

    @Get('/')
    async getAllProducts() {
        return await this.productPriceUsecase.readAll()
    }

    @Put('/:id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateProductPriceDto) {
        return await this.productPriceUsecase.update(id, input)
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productPriceUsecase.delete(id)
    }
}