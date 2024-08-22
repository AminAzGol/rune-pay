import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {CurrencyRepository} from "../../infrastructure/repositories/providers/currency.repository";
import {CurrencyM} from "../../domain/model/currency";
import {BASE_CURRENCY} from "../../domain/common/base-currency";

@Injectable()
export class CurrencyUsecase extends BaseUsecase<CurrencyRepository, CurrencyM> {

    constructor(repository: CurrencyRepository) {
        super(repository);
    }

    async getBaseCurrency(): Promise<CurrencyM> {
        return this.repository.findByName(BASE_CURRENCY)
    }
}