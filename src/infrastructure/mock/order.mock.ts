import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {OrderM} from "../../domain/model/order";
import {OrderRepository} from "../repositories/providers/order.repository";
import {OrderStatusEnum} from "../../domain/enum/order-status.enum";
import {ShopMock} from "./shop.mock";
import {ShopM} from "../../domain/model/shop";


@Injectable()
export class OrderMock extends BaseMock<OrderM> {

    constructor(repository: OrderRepository, private readonly shopMock: ShopMock) {
        const samples = [
            {
                totalPrice: 1000,
                customerName: 'michael',
                customerAddress: 'jackson',
                customerEmail: 'michael.jackson@gmail.com',
                status: OrderStatusEnum.PENDING

            }
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { shop?: boolean }) {
        const result = {shop: undefined as ShopM}
        if (!except?.shop) {
            result.shop = await this.shopMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<OrderM> {
        const {shop} = await this.prepareDependencies()
        const sample = this.getSample(index)
        return await this.createCustom({...sample, shopId: shop.id})
    }
}