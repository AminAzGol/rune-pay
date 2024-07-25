import {BaseUsecase} from "../base/base.usecase";
import {ShopRepository} from "../../infrastructure/repositories/shop.repository";
import {ShopM} from "../../domain/model/shop";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ShopUsecase extends BaseUsecase<ShopRepository, ShopM> {
    constructor(private readonly shopRepository: ShopRepository) {
        super(shopRepository);
    }
}