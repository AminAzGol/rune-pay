import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {RoleRepository} from "../../infrastructure/repositories/providers/role.repository";
import {RoleM} from "../../domain/model/role";

@Injectable()
export class RoleUsecase extends BaseUsecase<RoleRepository, RoleM> {

    constructor(repository: RoleRepository) {
        super(repository);
    }
}