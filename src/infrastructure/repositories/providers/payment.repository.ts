import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {PaymentM} from "../../../domain/model/payment";
import {Repository} from "typeorm";
import {PaymentEntity} from "../../entities/payment.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentM> {

    constructor(@InjectRepository(PaymentEntity) entityRepository: Repository<PaymentEntity>) {
        super(entityRepository);
    }
}