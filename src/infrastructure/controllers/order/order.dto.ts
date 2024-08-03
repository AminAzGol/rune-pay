import {OrderStatusEnum} from "../../../domain/enum/order-status.enum";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateOrderDto {

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    shopId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    totalPrice: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    customerName: string
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    customerAddress: string
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    customerEmail: string
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(OrderStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: OrderStatusEnum
}

export class UpdateOrderDto {

    @ApiProperty({required: true})
    @IsOptional()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    totalPrice: number
    @ApiProperty({required: true})
    @IsOptional()
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    customerName: string
    @ApiProperty({required: true})
    @IsOptional()
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    customerAddress: string
    @ApiProperty({required: true})
    @IsOptional()
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    customerEmail: string
    @ApiProperty({required: true})
    @IsOptional()
    @IsEnum(OrderStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: OrderStatusEnum
}