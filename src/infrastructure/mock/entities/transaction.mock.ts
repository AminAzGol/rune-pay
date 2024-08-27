import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {TransactionM} from "../../../domain/model/transaction";
import {TransactionRepository} from "../../repositories/providers/transaction.repository";
import {AcquisitionMock} from "./acquisition.mock";
import {AcquisitionM} from "../../../domain/model/acquisition";


@Injectable()
export class TransactionMock extends BaseMock<TransactionM> {

    constructor(repository: TransactionRepository, private readonly acquisitionMock: AcquisitionMock) {
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

    async prepareDependencies(except?: { acquisition: boolean }) {
        const result = {acquisition: undefined as AcquisitionM}
        if (!except?.acquisition) {
            result.acquisition = await this.acquisitionMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<TransactionM> {
        const sample = this.getSample(index)
        const {acquisition} = await this.prepareDependencies()
        sample.acquisitionId = acquisition.id
        return this.createCustom(sample)
    }
}