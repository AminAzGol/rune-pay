import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {TransactionRepository} from "../../infrastructure/repositories/providers/transaction.repository";
import {TransactionM} from "../../domain/model/transaction";

@Injectable()
export class TransactionUsecase extends BaseUsecase<TransactionRepository, TransactionM> {

    constructor(repository: TransactionRepository) {
        super(repository);
    }
}