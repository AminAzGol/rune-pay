import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {TransactionM} from "../../../domain/model/transaction";
import {IsNull, Not, Repository} from "typeorm";
import {TransactionEntity} from "../../entities/transaction.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionM> {

    constructor(@InjectRepository(TransactionEntity) entityRepository: Repository<TransactionEntity>) {
        super(entityRepository);
    }

    async findByHash(hash: string): Promise<TransactionM> {
        return await this.entityRepository.findOneBy({hash});
    }

    async findManyNotHavingAcquisition(where: Partial<TransactionM>) {
        return await this.entityRepository.find({
            where: {
                ...where,
                acquisitionId: IsNull()
            }
        });
    }

    async findManyHavingAcquisition(where: Partial<TransactionM>) {
        return await this.entityRepository.find({
            where: {
                ...where,
                acquisitionId: Not(IsNull())
            }
        });
    }
}