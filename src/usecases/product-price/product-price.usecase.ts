import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ProductPriceRepository} from "../../infrastructure/repositories/providers/product-price.repository";
import {ProductPriceM} from "../../domain/model/product-price";

@Injectable()
export class ProductPriceUsecase extends BaseUsecase<ProductPriceRepository, ProductPriceM> {

    constructor(repository: ProductPriceRepository) {
        super(repository);
    }
}