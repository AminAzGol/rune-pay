import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateShopUserDto {
    @ApiProperty({required: false})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    userId: number

    @ApiProperty({required: false})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    shopId: number
}