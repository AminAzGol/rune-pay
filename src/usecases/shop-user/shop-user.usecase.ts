import {BaseUsecase} from "../base/base.usecase";
import {ShopUserRepository} from "../../infrastructure/repositories/providers/shop-user.repository";
import {ShopUserM} from "../../domain/model/user-shop";
import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../infrastructure/repositories/providers/user.repository";
import {ShopRepository} from "../../infrastructure/repositories/providers/shop.repository";
import {BaseM} from "../../domain/model/base";

@Injectable()
export class ShopUserUsecase extends BaseUsecase<ShopUserRepository, ShopUserM> {

    constructor(private readonly shopUserRepository: ShopUserRepository, private readonly userRepository: UserRepository, private readonly shopRepository: ShopRepository) {
        super(shopUserRepository);
    }

    async create(input: Omit<ShopUserM, keyof BaseM>): Promise<ShopUserM> {
        await this.userRepository.findById(input.userId)
        await this.shopRepository.findById(input.shopId)
        return await this.shopUserRepository.insert(input)
    }
}