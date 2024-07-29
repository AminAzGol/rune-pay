import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {OrderProductPriceEntity} from "../../entities/order-product-price.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderProductPriceM} from "../../../domain/model/order-product-price";

@Injectable()
export class OrderProductPriceRepository extends BaseRepository<OrderProductPriceM> {
    constructor(@InjectRepository(OrderProductPriceEntity) repo: Repository<OrderProductPriceEntity>) {
        super(repo)
    }
}