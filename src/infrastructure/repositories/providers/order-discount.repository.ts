import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {OrderDiscountEntity} from "../../entities/order-discount.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class OrderDiscountRepository extends BaseRepository<OrderDiscountEntity> {
    constructor(@InjectRepository(OrderDiscountEntity) repo: OrderDiscountRepository) {
        super(repo)
    }
}