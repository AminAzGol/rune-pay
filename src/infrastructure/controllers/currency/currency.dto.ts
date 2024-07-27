import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateCurrencyDto {

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    name: string
}