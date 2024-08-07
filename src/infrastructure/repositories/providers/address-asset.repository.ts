import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {AddressAssetM} from "../../../domain/model/address-asset";
import {Repository} from "typeorm";
import {AddressAssetEntity} from "../../entities/address-asset.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AddressAssetRepository extends BaseRepository<AddressAssetM> {

    constructor(@InjectRepository(AddressAssetEntity) entityRepository: Repository<AddressAssetEntity>) {
        super(entityRepository);
    }
}