import {BaseMock} from "./base.mock";
import {UserM} from "../../../domain/model/user";
import {UserRepository} from "../../repositories/providers/user.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserMock extends BaseMock<UserM> {

    constructor(private readonly userRepository: UserRepository) {
        const mockSamples = [
            {
                email: 'bill.gates@bing.com',
                password: 'bill_123'
            },
            {
                email: 'elon@proton.me',
                password: 'elon_123'
            },
        ]
        super(userRepository, mockSamples);
    }
}