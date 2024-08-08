import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {TransactionM} from "../../../domain/model/transaction";
import {Repository} from "typeorm";
import {TransactionEntity} from "../../entities/transaction.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionM> {

    constructor(@InjectRepository(TransactionEntity) entityRepository: Repository<TransactionEntity>) {
        super(entityRepository);
    }
}