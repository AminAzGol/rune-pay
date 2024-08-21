import {
    Body,
    Controller,
    Delete,
    Get,
    Injectable,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Request
} from "@nestjs/common";
import {InvoiceUsecase} from "../../../usecases/invoice/invoice.usecase";
import {CreateInvoiceDto, UpdateInvoiceDto} from "./invoice.dto";
import {RolesGuard} from "../../common/decorators/roles.decorator";
import {RoleEnum} from "../../../domain/enum/role.enum";
import {ShopM} from "../../../domain/model/shop";
import {ApiPaginatedResponse} from "../../common/decorators/paginated-response.decorator";
import {InvoiceM} from "../../../domain/model/invoice";
import {PaginationOptionsDto} from "../../common/dto/pagination-options.dto";

@Injectable()
@Controller('invoice')

export class InvoiceController {

    constructor(
        private readonly invoiceUsecase: InvoiceUsecase
    ) {
    }

    @Post('/')
    @RolesGuard(RoleEnum.SHOP_OWNER)
    async createProduct(@Body() input: CreateInvoiceDto, @Request() request: any) {
        const shop: ShopM = request['shop']
        return await this.invoiceUsecase.createInvoice(shop, input)
    }

    @Get('/:id')
    async getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.invoiceUsecase.readById(id)
    }

    @Get('/')
    @ApiPaginatedResponse(InvoiceM)
    @RolesGuard(RoleEnum.SHOP_OWNER)
    async getAllProducts(@Query() query: PaginationOptionsDto, @Request() request) {
        const shop: ShopM = request['shop']
        return await this.invoiceUsecase.readShopInvoices(shop, query)
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