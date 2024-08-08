import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {ConversionRateM} from "../../domain/model/conversion-rate";
import {ConversionRateRepository} from "../repositories/providers/conversion-rate.repository";
import {AssetM} from "../../domain/model/asset";
import {CurrencyM} from "../../domain/model/currency";
import {AssetMock} from "./asset.mock";
import {CurrencyMock} from "./currency.mock";


@Injectable()
export class ConversionRateMock extends BaseMock<ConversionRateM> {

    constructor(repository: ConversionRateRepository, private readonly assetMock: AssetMock, private readonly currencyMock: CurrencyMock) {
        const samples = [
            {rate: 10, expiresAt: new Date()}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { asset: boolean, currency: boolean }) {
        const result = {asset: undefined as AssetM, currency: undefined as CurrencyM}
        if (!except?.asset) {
            result.asset = await this.assetMock.createMock(0)
        }
        if (!except?.currency) {
            result.currency = await this.currencyMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<ConversionRateM> {
        const sample = this.getSample(index)
        const {currency, asset} = await this.prepareDependencies()
        sample.currencyId = currency.id
        sample.assetId = asset.id
        return await this.createCustom(sample)
    }
}