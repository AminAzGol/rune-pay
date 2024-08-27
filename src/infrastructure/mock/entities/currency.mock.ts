import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {CurrencyM} from "../../../domain/model/currency";
import {CurrencyRepository} from "../../repositories/providers/currency.repository";

@Injectable()
export class CurrencyMock extends BaseMock<CurrencyM> {

    constructor(repository: CurrencyRepository) {
        const mockSamples = [
            {name: 'USD'}, {name: 'EURO'}
        ]
        super(repository, mockSamples);
    }
}