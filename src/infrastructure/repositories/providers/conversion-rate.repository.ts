import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ConversionRateM} from "../../../domain/model/conversion-rate";
import {Repository} from "typeorm";
import {ConversionRateEntity} from "../../entities/conversion-rate.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ConversionRateRepository extends BaseRepository<ConversionRateM> {

    constructor(@InjectRepository(ConversionRateEntity) entityRepository: Repository<ConversionRateEntity>) {
        super(entityRepository);
    }
}