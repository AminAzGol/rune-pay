import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {AcquisitionM} from "../../../domain/model/acquisition";
import {Repository} from "typeorm";
import {AcquisitionEntity} from "../../entities/acquisition.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AcquisitionRepository extends BaseRepository<AcquisitionM> {

    constructor(@InjectRepository(AcquisitionEntity) entityRepository: Repository<AcquisitionEntity>) {
        super(entityRepository);
    }
}