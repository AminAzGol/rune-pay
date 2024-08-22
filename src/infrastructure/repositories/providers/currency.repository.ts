import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {CurrencyM} from "../../../domain/model/currency";
import {Repository} from "typeorm";
import {CurrencyEntity} from "../../entities/currency.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";

@Injectable()
export class CurrencyRepository extends BaseRepository<CurrencyM> {

    constructor(@InjectRepository(CurrencyEntity) entityRepository: Repository<CurrencyEntity>) {
        super(entityRepository);
    }

    async findByName(name: string): Promise<CurrencyM> {
        const result = await this.entityRepository.findOne({
            where: {name}
        })
        if (!result) {
            throw new ResourceNotFoundException('Currency', {name})
        }
        return result as CurrencyM
    }
}