import {UserRepository} from "../../infrastructure/repositories/user.repository";
import {UserAttributes, UserM} from "../../domain/model/user";
import {ExceptionsService} from "../../infrastructure/services/exceptions/exceptions.service";
import {ResourceNotFoundException} from "../../domain/exceptions/resource-exceptions";
import {BaseUsecase} from "../base/base.usecase";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserUsecase extends BaseUsecase<UserRepository, UserM> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {
        super(userRepository)
    }

    async create(input: UserAttributes) {
        try {
            const existingUser = await this.userRepository.findByEmail(input.email)
            if (existingUser) {
                this.exceptionsService.conflictException({
                    resource: 'user',
                    message: 'email already exists',
                    details: {email: input.email}
                })
            }
        } catch (e) {
            if (!(e instanceof ResourceNotFoundException)) {
                throw e;
            }
        }
        return await this.userRepository.insert(input)
    }
}