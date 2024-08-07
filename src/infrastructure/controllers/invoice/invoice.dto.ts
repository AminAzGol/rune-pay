import {InvoiceStatusEnum} from "../../../domain/enum/invoice-status.enum";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateInvoiceDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    orderId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    currencyId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    shopId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    amount: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(InvoiceStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: InvoiceStatusEnum

}

export class UpdateInvoiceDto {
    @ApiProperty({required: true})
    @IsOptional()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    amount: number

    @ApiProperty({required: true})
    @IsOptional()
    @IsEnum(InvoiceStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: InvoiceStatusEnum
}