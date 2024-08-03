import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {OrderProductPriceRepository} from "../../infrastructure/repositories/providers/order-product-price.repository";
import {OrderProductPriceM} from "../../domain/model/order-product-price";

@Injectable()
export class OrderProductPriceUsecase extends BaseUsecase<OrderProductPriceRepository, OrderProductPriceM> {

    constructor(repository: OrderProductPriceRepository) {
        super(repository);
    }
}