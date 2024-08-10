import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ShopWalletAddressRepository} from "../../infrastructure/repositories/providers/shop-wallet-address.repository";
import {ShopWalletAddressM} from "../../domain/model/shop-wallet-address";

@Injectable()
export class ShopWalletAddressUsecase extends BaseUsecase<ShopWalletAddressRepository, ShopWalletAddressM> {

    constructor(repository: ShopWalletAddressRepository) {
        super(repository);
    }
}