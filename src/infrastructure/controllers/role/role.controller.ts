import {Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {RoleUsecase} from "../../../usecases/role/role.usecase";
import {CreateRoleDto, UpdateRoleDto} from "./role.dto";

@Injectable()
@Controller('role')

export class RoleController {

    constructor(
        private readonly roleUsecase: RoleUsecase
    ) {
    }

    @Post('/')
    async create(@Body() input: CreateRoleDto) {
        return await this.roleUsecase.create(input)
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.roleUsecase.readById(id)
    }

    @Get('/')
    async getAll() {
        return await this.roleUsecase.readAll()
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateRoleDto) {
        return await this.roleUsecase.update(id, input)
    }

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.roleUsecase.delete(id)
    }
}