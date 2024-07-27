import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {ProductUsecase} from "../../../usecases/product/product.usecase";
import {CreateProductDto, UpdateProductDto} from "./product.dto";

@Controller('product')
@Injectable()
export class ProductController {
    constructor(
        private readonly productUsecase: ProductUsecase
    ) {
    }

    @Post('/')
    async createProduct(@Body() input: CreateProductDto) {
        return await this.productUsecase.create(input)
    }

    @Get('/:id')
    async getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productUsecase.readById(id)
    }

    @Get('/')
    async getAllProducts() {
        return await this.productUsecase.readAll()
    }

    @Put('/:id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateProductDto) {
        return await this.productUsecase.update(id, input)
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productUsecase.delete(id)
    }
}