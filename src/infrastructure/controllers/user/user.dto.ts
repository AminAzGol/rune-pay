import {i18nValidationMessage} from "nestjs-i18n";
import {IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString()
    readonly email: string;

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    @MinLength(8, {message: i18nValidationMessage('validations.MINIMUM_NOT_OBSERVED')})
    readonly password: string;
}

export class UpdateUserDto {
    @ApiProperty({required: false})
    @IsOptional({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString()
    readonly email: string;

    @ApiProperty({required: false})
    @IsOptional({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    @MinLength(8, {message: i18nValidationMessage('validations.MINIMUM_NOT_OBSERVED')})
    readonly password: string;
}

export class LoginDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString()
    readonly email: string;

    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString({message: i18nValidationMessage('validations.INVALID_STRING')})
    readonly password: string;
}