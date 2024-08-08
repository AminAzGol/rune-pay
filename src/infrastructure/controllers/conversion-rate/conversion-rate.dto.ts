import {IsDate, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";

export class CreateConversionRateDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})

    assetId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    currencyId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    rate: number

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @Transform(({value}) => value && new Date(value))
    @IsDate({message: i18nValidationMessage('validations.INVALID_DATE')})

    expiresAt: Date

}

export class UpdateConversionRateDto {

    @ApiProperty({required: true})
    @IsOptional()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    rate: number

    @ApiProperty({required: true})
    @IsOptional({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @Transform(({value}) => value && new Date(value))
    @IsDate({message: i18nValidationMessage('validations.INVALID_NUMBER')})
    expiresAt: Date

}