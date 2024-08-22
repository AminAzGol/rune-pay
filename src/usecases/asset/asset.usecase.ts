import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AssetRepository} from "../../infrastructure/repositories/providers/asset.repository";
import {AssetM} from "../../domain/model/asset";

@Injectable()
export class AssetUsecase extends BaseUsecase<AssetRepository, AssetM> {

    constructor(repository: AssetRepository) {
        super(repository);
    }

}