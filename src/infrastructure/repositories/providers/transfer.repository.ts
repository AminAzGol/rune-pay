import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {TransferM} from "../../../domain/model/transfer";
import {Repository} from "typeorm";
import {TransferEntity} from "../../entities/transfer.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TransferRepository extends BaseRepository<TransferM> {

    constructor(@InjectRepository(TransferEntity) entityRepository: Repository<TransferEntity>) {
        super(entityRepository);
    }
}