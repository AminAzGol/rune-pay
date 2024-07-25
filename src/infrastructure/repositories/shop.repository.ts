import {BaseRepository} from "./base.repository";
import {ShopM} from "../../domain/model/shop";
import {ShopEntity} from "../entities/shop.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ShopRepository extends BaseRepository<ShopM> {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopEntityRepository: Repository<ShopEntity>
    ) {
        super(shopEntityRepository);
    }
}