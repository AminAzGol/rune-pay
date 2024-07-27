import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {CurrencyM} from "../../../domain/model/currency";
import {Repository} from "typeorm";
import {CurrencyEntity} from "../../entities/currency.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CurrencyRepository extends BaseRepository<CurrencyM> {

    constructor(@InjectRepository(CurrencyEntity) entityRepository: Repository<CurrencyEntity>) {
        super(entityRepository);
    }
}