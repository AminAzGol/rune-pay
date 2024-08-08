import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ConversionRateRepository} from "../../infrastructure/repositories/providers/conversion-rate.repository";
import {ConversionRateM} from "../../domain/model/conversion-rate";

@Injectable()
export class ConversionRateUsecase extends BaseUsecase<ConversionRateRepository, ConversionRateM> {

    constructor(repository: ConversionRateRepository) {
        super(repository);
    }
}