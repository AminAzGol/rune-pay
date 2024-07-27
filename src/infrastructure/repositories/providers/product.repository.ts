import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ProductM} from "../../../domain/model/product";
import {Repository} from "typeorm";
import {ProductEntity} from "../../entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductRepository extends BaseRepository<ProductM> {

    constructor(@InjectRepository(ProductEntity) entityRepository: Repository<ProductEntity>) {
        super(entityRepository);
    }
}