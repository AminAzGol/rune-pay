import {IsNotEmpty, IsNumber} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAddressAssetDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    assetId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    addressId: number
}