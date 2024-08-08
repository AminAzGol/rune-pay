import {IsEnum, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";
import {AcquisitionStateEnum} from "../../../domain/enum/acquisition-state.enum";

export class CreateAcquisitionDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    paymentId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    addressAssetId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(AcquisitionStateEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    state: AcquisitionStateEnum
}

export class UpdateAcquisitionDto {

    @ApiProperty({required: true})
    @IsOptional()
    @IsEnum(AcquisitionStateEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    state: AcquisitionStateEnum
}