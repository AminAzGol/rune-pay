import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {OrderRepository} from "../../infrastructure/repositories/providers/order.repository";
import {OrderM} from "../../domain/model/order";

@Injectable()
export class OrderUsecase extends BaseUsecase<OrderRepository, OrderM> {

    constructor(repository: OrderRepository) {
        super(repository);
    }
}