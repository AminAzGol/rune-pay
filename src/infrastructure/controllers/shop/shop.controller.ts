import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {CreateShopDto, UpdateShopDto} from "./shop.dto";
import {ShopUsecase} from "../../../usecases/shop/shop.usecase";

@Controller('shop')
@Injectable()
export class ShopController {
    constructor(private readonly shopUsecase: ShopUsecase) {
    }

    @Post('/')
    async createUser(@Body() shop: CreateShopDto) {
        return this.shopUsecase.create(shop)
    }

    @Get('/:id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return this.shopUsecase.readById(id)
    }

    @Put('/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() shop: UpdateShopDto) {
        return this.shopUsecase.update(id, shop)
    }

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.shopUsecase.delete(id)
    }
}