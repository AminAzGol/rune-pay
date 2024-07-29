import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ProductPriceM} from "../../../domain/model/product-price";
import {Repository} from "typeorm";
import {ProductPriceEntity} from "../../entities/product-price.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductPriceRepository extends BaseRepository<ProductPriceM> {

    constructor(@InjectRepository(ProductPriceEntity) entityRepository: Repository<ProductPriceEntity>) {
        super(entityRepository);
    }
}