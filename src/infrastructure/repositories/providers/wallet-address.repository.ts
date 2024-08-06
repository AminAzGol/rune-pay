import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {WalletAddressM} from "../../../domain/model/wallet-address";
import {Repository} from "typeorm";
import {WalletAddressEntity} from "../../entities/wallet-address.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class WalletAddressRepository extends BaseRepository<WalletAddressM> {

    constructor(@InjectRepository(WalletAddressEntity) entityRepository: Repository<WalletAddressEntity>) {
        super(entityRepository);
    }
}