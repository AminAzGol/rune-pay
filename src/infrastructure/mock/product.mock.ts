import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {ProductM} from "../../domain/model/product";
import {ProductRepository} from "../repositories/providers/product.repository";
import {ShopM} from "../../domain/model/shop";
import {ShopMock} from "./shop.mock";

@Injectable()
export class ProductMock extends BaseMock<ProductM> {

    constructor(repository: ProductRepository, private readonly shopMock: ShopMock) {
        const mockSamples = [
            {name: 'carpet', isActive: true},
            {name: 'car', isActive: true}
        ]
        super(repository, mockSamples);
    }

    async prepareDependencies(except?: { shop?: boolean }) {
        let shop: ShopM;
        if (!except?.shop) {
            shop = await this.shopMock.createMock(0)
        }
        return {shop}
    }

    async createMock(index): Promise<ProductM> {
        const {shop} = await this.prepareDependencies()
        const product = this.getSample(index)
        product.shopId = shop.id
        return this.createCustom(product)
    }
}