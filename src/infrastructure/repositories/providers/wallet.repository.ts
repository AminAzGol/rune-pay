import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {WalletM} from "../../../domain/model/wallet";
import {Repository} from "typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class WalletRepository extends BaseRepository<WalletM> {

    constructor(@InjectRepository(WalletEntity) entityRepository: Repository<WalletEntity>) {
        super(entityRepository);
    }
}