import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ConversionRateRepository} from "../../infrastructure/repositories/providers/conversion-rate.repository";
import {ConversionRateM} from "../../domain/model/conversion-rate";
import {AssetRepository} from "../../infrastructure/repositories/providers/asset.repository";
import {MidgardClient} from "../../infrastructure/services/chain-manager/clients/midgard/midgard-client";
import {DateUtils} from "../../infrastructure/common/utils/date.utils";
import {CurrencyUsecase} from "../currency/currency.usecase";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";

@Injectable()
export class ConversionRateUsecase extends BaseUsecase<ConversionRateRepository, ConversionRateM> {

    constructor(repository: ConversionRateRepository, private readonly assetRepository: AssetRepository, private readonly midgardClient: MidgardClient,
                private readonly currencyUsecase: CurrencyUsecase) {
        super(repository);
    }

    async readByAssetIdAndCurrencyId(assetId: number, currencyId: number): Promise<ConversionRateM> {
        const existingRecord = await this.repository.findMostRecentConversionRateByAssetIdAndCurrencyId(assetId, currencyId)
        if (existingRecord) {
            return existingRecord
        }
        throw new ResourceNotFoundException('ConversionRate', {assetId, currencyId})
    }

    async updateAllConversionRates(): Promise<void> {
        const baseCurrency = await this.currencyUsecase.getBaseCurrency()
        const allAssets = await this.assetRepository.findAllWithChain()
        const midgardAssets = await this.midgardClient.getAssetsWithPrice()
        for (const asset of allAssets) {
            const midgardAsset = midgardAssets.find(o => {
                return o.asset === asset.name
                && o.chain === asset.chain.name
                && asset.contractAddress ? o.contract === asset.contractAddress : true
            })
            if (midgardAsset) {
                await this.repository.insert({
                    rate: midgardAsset.priceUsd,
                    assetId: asset.id,
                    expiresAt: DateUtils.getNextXMinutes(10),
                    currencyId: baseCurrency.id
                })
            }
            /* TODO: setup a job to deactivate assets that have a expired conversion-rate */
        }
    }
}