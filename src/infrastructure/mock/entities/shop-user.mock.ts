import {BaseMock} from "./base.mock";
import {ShopM} from "../../../domain/model/shop";
import {Injectable} from "@nestjs/common";
import {UserMock} from "./user.mock";
import {ShopMock} from "./shop.mock";
import {UserM} from "../../../domain/model/user";
import {ShopUserM} from "../../../domain/model/user-shop";
import {ShopUserRepository} from "../../repositories/providers/shop-user.repository";

@Injectable()
export class ShopUserMock extends BaseMock<ShopUserM> {

    constructor(repository: ShopUserRepository, private readonly userMock: UserMock, private readonly shopMock: ShopMock) {
        const mockSamples = []
        super(repository, mockSamples);
    }

    async prepareDependencies(except?: { user?: boolean, shop?: boolean }) {
        let user: UserM;
        let shop: ShopM;
        if (!except?.user) {
            user = await this.userMock.createMock(0)
        }
        if (!except?.shop) {
            shop = await this.shopMock.createMock(0)
        }
        return {shop, user}
    }
}