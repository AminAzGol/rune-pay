import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateProductDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    name: string
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    shopId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsBoolean({message: i18nValidationMessage('validations.INVALID_BOOLEAN')})
    isActive: boolean
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    quantity: number
}


export class UpdateProductDto {
    @ApiProperty({required: true})
    @IsOptional()
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    name: string
    @ApiProperty({required: true})
    @IsOptional()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    quantity: number
    @ApiProperty({required: true})
    @IsOptional()
    @IsBoolean({message: i18nValidationMessage('validations.INVALID_BOOLEAN')})
    isActive: boolean
}
