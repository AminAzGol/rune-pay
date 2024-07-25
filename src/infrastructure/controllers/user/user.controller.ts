import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {UserUsecase} from "../../../usecases/user/user.usecase";
import {CreateUserDto, UpdateUserDto} from "./user.dto";

@Controller('user')
@Injectable()
export class UserController {
    constructor(
        private readonly userUsecase: UserUsecase
    ) {
    }

    @Post('/')
    async createUser(@Body() user: CreateUserDto) {
        return this.userUsecase.create(user)
    }

    @Get('/:id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userUsecase.readById(id)
    }

    @Put('/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.userUsecase.update(id, user)
    }

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userUsecase.delete(id)
    }


}