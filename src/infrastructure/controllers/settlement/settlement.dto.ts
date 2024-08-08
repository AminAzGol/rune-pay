import {ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";
import {SettlementStatusEnum} from "../../../domain/enum/settlement-status.enum";

export class CreateSettlementDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(SettlementStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: SettlementStatusEnum
    @IsArray()
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER'), each: true})
    @ArrayMinSize(1)
    paymentIds: number[]
}

export class UpdateSettlementDto {
    @ApiProperty({required: true})
    @IsOptional()
    @IsEnum(SettlementStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: SettlementStatusEnum
}