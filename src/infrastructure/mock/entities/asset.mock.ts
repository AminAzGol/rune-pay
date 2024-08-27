import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {AssetM} from "../../../domain/model/asset";
import {AssetRepository} from "../../repositories/providers/asset.repository";
import {ChainM} from "../../../domain/model/chain";
import {ChainMock} from "./chain.mock";


@Injectable()
export class AssetMock extends BaseMock<AssetM> {

    constructor(repository: AssetRepository, private readonly chainMock: ChainMock) {
        const samples = [
            {ticker: 'BNB', name: 'BNB'}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { chain?: boolean }) {
        const result = {chain: undefined as ChainM}
        if (!except?.chain) {
            result.chain = await this.chainMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<AssetM> {
        const sample = this.getSample(index)
        const {chain} = await this.prepareDependencies()
        return await this.createCustom({...sample, chainId: chain.id})
    }
}