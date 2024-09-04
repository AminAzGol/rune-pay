import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {PaymentM} from "../../../domain/model/payment";
import {In, Repository} from "typeorm";
import {PaymentEntity} from "../../entities/payment.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentM> {

    constructor(@InjectRepository(PaymentEntity) private readonly paymentEntityRepository: Repository<PaymentEntity>) {
        super(paymentEntityRepository);
    }

    async findManyByIds(ids: number[]): Promise<PaymentM[]> {
        const result = await this.paymentEntityRepository.find({
            where: {id: In(ids)},
            relations: {acquisition: true}
        })
        if (result.length !== ids.length) {
            throw new ResourceNotFoundException('Payment', {ids})
        }
        return result as PaymentM[]
    }
}