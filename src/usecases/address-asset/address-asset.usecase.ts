import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AddressAssetRepository} from "../../infrastructure/repositories/providers/address-asset.repository";
import {AddressAssetM} from "../../domain/model/address-asset";

@Injectable()
export class AddressAssetUsecase extends BaseUsecase<AddressAssetRepository, AddressAssetM> {

    constructor(repository: AddressAssetRepository) {
        super(repository);
    }
}