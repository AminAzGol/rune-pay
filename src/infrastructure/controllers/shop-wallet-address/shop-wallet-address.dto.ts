import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";

export class CreateShopWalletAddressDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    address: string

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    shopId: number

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    assetId: number
}

export class UpdateShopWalletAddressDto {

    @ApiProperty({required: true})
    @IsOptional()
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    address: string
}