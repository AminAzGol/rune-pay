import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {AcquisitionRepository} from "../../infrastructure/repositories/providers/acquisition.repository";
import {AcquisitionM} from "../../domain/model/acquisition";

@Injectable()
export class AcquisitionUsecase extends BaseUsecase<AcquisitionRepository, AcquisitionM> {

    constructor(repository: AcquisitionRepository) {
        super(repository);
    }
}