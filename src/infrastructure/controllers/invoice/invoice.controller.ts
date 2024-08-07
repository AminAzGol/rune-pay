import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {InvoiceUsecase} from "../../../usecases/invoice/invoice.usecase";
import {CreateInvoiceDto, UpdateInvoiceDto} from "./invoice.dto";

@Injectable()
@Controller('invoice')

export class InvoiceController {

    constructor(
        private readonly invoiceUsecase: InvoiceUsecase
    ) {
    }

    @Post('/')
    async createProduct(@Body() input: CreateInvoiceDto) {
        return await this.invoiceUsecase.create(input)
    }

    @Get('/:id')
    async getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.invoiceUsecase.readById(id)
    }

    @Get('/')
    async getAllProducts() {
        return await this.invoiceUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateInvoiceDto) {
        return await this.invoiceUsecase.update(id, input)
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.invoiceUsecase.delete(id)
    }
}