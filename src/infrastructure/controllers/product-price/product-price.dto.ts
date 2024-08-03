import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateProductPriceDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    currencyId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    productId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    price: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsBoolean({message: i18nValidationMessage('validations.INVALID_BOOLEAN')})
    isActive: boolean
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    quantity: number
}

export class UpdateProductPriceDto {
    @ApiProperty({required: true})
    @IsOptional()
    @IsBoolean({message: i18nValidationMessage('validations.INVALID_BOOLEAN')})
    isActive: boolean
}