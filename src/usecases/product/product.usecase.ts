import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ProductRepository} from "../../infrastructure/repositories/providers/product.repository";
import {ProductM} from "../../domain/model/product";

@Injectable()
export class ProductUsecase extends BaseUsecase<ProductRepository, ProductM> {

    constructor(repository: ProductRepository) {
        super(repository);
    }
}