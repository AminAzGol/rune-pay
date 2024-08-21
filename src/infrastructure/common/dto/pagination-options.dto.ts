import {PageOptionsInterface} from "../../../domain/common/page-options.interface";
import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {Type} from "class-transformer";

enum OrderEnum {
    ASC = "ASC",
    DESC = "DESC"
}

export class PaginationOptionsDto implements PageOptionsInterface {
    @ApiProperty()
    @IsOptional()
    @IsEnum(OrderEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    order: OrderEnum;
    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    skip: number;
    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    take: number;
}