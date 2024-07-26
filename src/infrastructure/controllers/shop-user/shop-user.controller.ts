import {Body, Controller, Delete, Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {ShopUserUsecase} from "../../../usecases/shop-user/shop-user.usecase";
import {CreateShopUserDto} from "./shop-user.dto";

@Controller('shop-user')
@Injectable()
export class ShopUserController {

    constructor(private readonly shopUserUsecase: ShopUserUsecase) {
    }

    @Post('/')
    async createShopUser(@Body() input: CreateShopUserDto) {
        return await this.shopUserUsecase.create(input)
    }

    @Delete('/:id')
    async deleteShopUser(@Param('id', ParseIntPipe) id: number) {
        return await this.shopUserUsecase.delete(id)
    }
}