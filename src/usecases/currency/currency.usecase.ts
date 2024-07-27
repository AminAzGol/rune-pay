import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {CurrencyRepository} from "../../infrastructure/repositories/providers/currency.repository";
import {CurrencyM} from "../../domain/model/currency";

@Injectable()
export class CurrencyUsecase extends BaseUsecase<CurrencyRepository, CurrencyM> {

    constructor(repository: CurrencyRepository) {
        super(repository);
    }
}