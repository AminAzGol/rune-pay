import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {ProductPriceM} from "../../domain/model/product-price";
import {ProductPriceRepository} from "../repositories/providers/product-price.repository";
import {CurrencyMock} from "./currency.mock";
import {ProductM} from "../../domain/model/product";
import {ProductMock} from "./product.mock";
import {CurrencyM} from "../../domain/model/currency";


@Injectable()
export class ProductPriceMock extends BaseMock<ProductPriceM> {

    constructor(repository: ProductPriceRepository, private readonly currencyMock: CurrencyMock, private readonly productMock: ProductMock) {
        const samples = [
            {price: 10000, isActive: false, quantity: 20},
            {price: 200, isActive: true, quantity: 20}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { currency?: boolean, product?: boolean }) {
        let currency: CurrencyM
        let product: ProductM
        if (!except?.currency) {
            currency = await this.currencyMock.createMock(0)
        }
        if (!except?.product) {
            product = await this.productMock.createMock(0)
        }
        return {currency, product}
    }

    async createMock(index: number): Promise<ProductPriceM> {
        const {currency, product} = await this.prepareDependencies()
        const sample = this.getSample(index)
        sample.currencyId = currency.id
        sample.productId = product.id
        return await this.createCustom(sample)
    }
}