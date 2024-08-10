import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ShopWalletAddressM} from "../../../domain/model/shop-wallet-address";
import {Repository} from "typeorm";
import {ShopWalletAddressEntity} from "../../entities/shop-wallet-address.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ShopWalletAddressRepository extends BaseRepository<ShopWalletAddressM> {

    constructor(@InjectRepository(ShopWalletAddressEntity) entityRepository: Repository<ShopWalletAddressEntity>) {
        super(entityRepository);
    }
}