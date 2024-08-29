import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {TransactionM} from "../../../domain/model/transaction";
import {TransactionRepository} from "../../repositories/providers/transaction.repository";


@Injectable()
export class TransactionMock extends BaseMock<TransactionM> {

    constructor(repository: TransactionRepository) {
        const samples = [
            {
                amount: 1000,
                confirmations: 10,
                minConfirmations: 2,
                hash: 'xyz',
                from: 'zyx',
                assetTicker: 'xx',
                assetsMatch: true
            }
        ]
        super(repository, samples);
    }
}