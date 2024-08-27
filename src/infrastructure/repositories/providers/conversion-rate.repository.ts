import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ConversionRateM} from "../../../domain/model/conversion-rate";
import {LessThan, Repository} from "typeorm";
import {ConversionRateEntity} from "../../entities/conversion-rate.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ConversionRateRepository extends BaseRepository<ConversionRateM> {

    constructor(@InjectRepository(ConversionRateEntity) entityRepository: Repository<ConversionRateEntity>) {
        super(entityRepository);
    }

    async findMostRecentConversionRateByAssetIdAndCurrencyId(assetId: number, currencyId: number): Promise<ConversionRateM> {
        return this.entityRepository.findOne({
            where: {assetId, currencyId, expiresAt: LessThan(new Date())},
            order: {createdAt: 1},
        })
    }
}