import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {OrderProductPriceM} from "../../domain/model/order-product-price";
import {OrderProductPriceRepository} from "../repositories/providers/order-product-price.repository";
import {OrderMock} from "./order.mock";
import {ProductPriceMock} from "./product-price.mock";
import {OrderM} from "../../domain/model/order";
import {ProductPriceM} from "../../domain/model/product-price";


@Injectable()
export class OrderProductPriceMock extends BaseMock<OrderProductPriceM> {

    constructor(repository: OrderProductPriceRepository, private readonly orderMock: OrderMock, private readonly productPriceMock: ProductPriceMock) {
        const samples = []
        super(repository, samples);
    }

    async prepareDependencies(except?: { order?: boolean, productPrice?: boolean }) {
        const result: { order: OrderM, productPrice: ProductPriceM } = {order: undefined, productPrice: undefined}
        if (!except?.order) {
            result.order = await this.orderMock.createMock(0)
        }
        if (!except?.productPrice) {
            result.productPrice = await this.productPriceMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<OrderProductPriceM> {
        const {order, productPrice} = await this.prepareDependencies()
        return await this.createCustom({orderId: order.id, productPriceId: productPrice.id})
    }
}