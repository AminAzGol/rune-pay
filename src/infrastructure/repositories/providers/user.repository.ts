import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../../entities/user.entity";
import {UserM} from "../../../domain/model/user";
import {BaseRepository} from "./base.repository";
import {BaseM} from "../../../domain/model/base";
import {CryptographyService} from "../../services/cryptography/cryptography-service";

export class UserRepository extends BaseRepository<UserM> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private readonly cryptographyService: CryptographyService
    ) {
        super(userEntityRepository)
    }


    async insert(input: Omit<UserM, keyof BaseM>): Promise<UserM> {
        input.password = await this.cryptographyService.encryptPassword(input.password)
        const result = await this.userEntityRepository.insert(input)
        return this.findById(result.raw[0].id)
    }
}