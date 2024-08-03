import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {OrderDiscountEntity} from "../../entities/order-discount.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderDiscountM} from "../../../domain/model/order-discount";
import {Repository} from "typeorm";

@Injectable()
export class OrderDiscountRepository extends BaseRepository<OrderDiscountM> {
    constructor(@InjectRepository(OrderDiscountEntity) repo: Repository<OrderDiscountEntity>) {
        super(repo)
    }
}