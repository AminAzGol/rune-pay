import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";

export class CreateShopDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString()//FIXME:
    readonly name: string;
}

export class UpdateShopDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsString()
    readonly name: string;
}