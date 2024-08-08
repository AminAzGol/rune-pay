import {IsDate, IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import {i18nValidationMessage} from "nestjs-i18n";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import {PaymentStatusEnum} from "../../../domain/enum/payment-status.enum";

export class CreatePaymentDto {
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    invoiceId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    baseCurrencyId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    baseAmount: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    payAssetId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    payAmount: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsNumber({}, {message: i18nValidationMessage('validations.INVALID_NUMBER')})
    conversionRateId: number
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @IsEnum(PaymentStatusEnum, {message: i18nValidationMessage('validations.INVALID_FORMAT')})
    status: PaymentStatusEnum
    @ApiProperty({required: true})
    @IsNotEmpty({message: i18nValidationMessage('validations.NOT_EMPTY')})
    @Transform(({value}) => value && new Date(value))
    @IsDate({message: i18nValidationMessage('validations.INVALID_DATE')})
    expiresAt: Date
}
