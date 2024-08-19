import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../../entities/user.entity";
import {UserM, UserWithPassword, UserWithRawPassword} from "../../../domain/model/user";
import {BaseRepository} from "./base.repository";
import {BaseM} from "../../../domain/model/base";
import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";
import {CryptographyService} from "../../services/cryptography/cryptography-service";

export class UserRepository extends BaseRepository<UserM> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private readonly cryptographyService: CryptographyService,
    ) {
        super(userEntityRepository)
    }


    async insert(input: Omit<UserM, keyof BaseM>): Promise<UserM> {
        const password = await this.cryptographyService.encryptPassword((input as UserWithRawPassword).password)
        const result = await this.userEntityRepository.insert({...input, password})
        return this.findById(result.raw[0].id)
    }

    async findByEmailIncludePassword(email: string): Promise<UserWithPassword> {
        const user = await this.userEntityRepository.findOne({select: {password: true}, where: {email}})
        if (!user) {
            throw new ResourceNotFoundException('User', {email})
        }
        return user as UserWithPassword
    }
}