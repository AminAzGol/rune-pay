import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {AssetM} from "../../../domain/model/asset";
import {Repository} from "typeorm";
import {AssetEntity} from "../../entities/asset.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AssetRepository extends BaseRepository<AssetM> {

    constructor(@InjectRepository(AssetEntity) entityRepository: Repository<AssetEntity>) {
        super(entityRepository);
    }

    async findById(id: number): Promise<Required<AssetM>> {
        return await this.entityRepository.findOne({
            where: {id},
            relations: {
                chain: true
            }
        })
    }

    async findAllWithChain(): Promise<AssetM[]> {
        const result = await this.entityRepository.find({
            relations: {chain: true}
        })
        return result as AssetM[]
    }
}