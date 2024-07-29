import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ProductDiscountM} from "../../../domain/model/product-discount";
import {Repository} from "typeorm";
import {ProductDiscountEntity} from "../../entities/product-discount.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductDiscountRepository extends BaseRepository<ProductDiscountM> {
    constructor(@InjectRepository(ProductDiscountEntity) entityRepository: Repository<ProductDiscountEntity>) {
        super(entityRepository);
    }
}