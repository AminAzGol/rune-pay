import {IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";
import {RoleEnum} from "../../../domain/enum/role.enum";

export class CreateRoleDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    userId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    shopId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(RoleEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    role: RoleEnum
}

export class UpdateRoleDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(RoleEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    role: RoleEnum
}