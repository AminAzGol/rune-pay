import {CurrencyRepository} from "../../infrastructure/repositories/providers/currency.repository";
import {CurrencyEnum} from "../../domain/enum/currency.enum";
import {Injectable} from "@nestjs/common";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";

@Injectable()
export class CurrencySeed {
    seeds = [
        {name: CurrencyEnum.USD}
    ]

    constructor(
        private readonly currencyRepository: CurrencyRepository
    ) {
    }

    async runSeed(): Promise<void> {
        for (const currency of this.seeds) {
            try {
                await this.currencyRepository.findByName(currency.name)
            } catch (e) {
                if (e instanceof ResourceNotFoundException) {
                } else {
                    throw e
                }
            }
            await this.currencyRepository.insert(currency)
        }
    }
}