import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {OrderM} from "../../../domain/model/order";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "../../entities/order.entity";
import {Repository} from "typeorm";

@Injectable()
export class OrderRepository extends BaseRepository<OrderM> {
    constructor(@InjectRepository(OrderEntity) repo: Repository<OrderEntity>) {
        super(repo)
    }
}