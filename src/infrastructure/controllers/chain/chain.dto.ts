import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateChainDto {

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    name: string
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    minConfirmations: number
}

export class UpdateChainDto {

    @ApiProperty({required: true})
    @IsOptional()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    minConfirmations: number
}