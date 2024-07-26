import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {ShopUserM} from "../../../domain/model/user-shop";
import {InjectRepository} from "@nestjs/typeorm";
import {ShopUserEntity} from "../../entities/shop-user.entity";
import {Repository} from "typeorm";
import {BaseM} from "../../../domain/model/base";
import {MethodIsNotAvailableException} from "../../../domain/exceptions/structure-exceptions";

@Injectable()
export class ShopUserRepository extends BaseRepository<ShopUserM> {

    constructor(
        @InjectRepository(ShopUserEntity)
            entityRepository: Repository<ShopUserEntity>) {
        super(entityRepository);
    }

    update(id: number, input: Partial<Omit<ShopUserM, keyof BaseM>>): Promise<ShopUserM> {
        throw new MethodIsNotAvailableException()
    }
}