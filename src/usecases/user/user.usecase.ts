import {UserRepository} from "../../infrastructure/repositories/providers/user.repository";
import {UserM, UserWithPassword, UserWithRawPassword} from "../../domain/model/user";
import {ExceptionsService} from "../../infrastructure/services/exceptions/exceptions.service";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";
import {BaseUsecase} from "../base/base.usecase";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {BaseM} from "../../domain/model/base";
import {CryptographyService} from "../../infrastructure/services/cryptography/cryptography-service";

@Injectable()
export class UserUsecase extends BaseUsecase<UserRepository, UserM> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly cryptographyService: CryptographyService,
        private readonly exceptionsService: ExceptionsService,
    ) {
        super(userRepository)
    }

    async create(input: Omit<UserWithRawPassword, keyof BaseM>) {
        let existingUser: UserM
        try {
            existingUser = await this.userRepository.findByEmail(input.email)
        } catch (e) {
            if (!(e instanceof ResourceNotFoundException)) {
                throw e;
            }
        }
        if (existingUser) {
            this.exceptionsService.conflictException({
                resource: 'user',
                message: 'email already exists',
                details: {email: input.email}
            })
        }
        return await this.userRepository.insert(input)
    }

    async login(email: string, password: string) {
        let existingUser: UserWithPassword
        try {
            existingUser = await this.repository.findByEmailIncludePassword(email)
        } catch (e) {
            if (e instanceof ResourceNotFoundException) {
                throw new UnauthorizedException({email})
            }
            throw e;
        }
        const match = await this.cryptographyService.comparePassword(password, existingUser.password)
        if (!match) {
            throw new UnauthorizedException({email})
        }
        const [token, refreshToken] = await Promise.all([
            this.cryptographyService.signUserJwtToken({email, userId: existingUser.id}),
            this.cryptographyService.signRefreshToken({email, userId: existingUser.id})
        ])
        return {
            token,
            refreshToken
        }
    }
}