import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {ChainRepository} from "../../infrastructure/repositories/providers/chain.repository";
import {ChainM} from "../../domain/model/chain";

@Injectable()
export class ChainUsecase extends BaseUsecase<ChainRepository, ChainM> {

    constructor(repository: ChainRepository) {
        super(repository);
    }
}