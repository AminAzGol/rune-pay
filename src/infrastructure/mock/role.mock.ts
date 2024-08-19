import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {RoleM} from "../../domain/model/role";
import {RoleRepository} from "../repositories/providers/role.repository";
import {RoleEnum} from "../../domain/enum/role.enum";
import {UserMock} from "./user.mock";
import {ShopM} from "../../domain/model/shop";
import {ShopMock} from "./shop.mock";
import {UserM} from "../../domain/model/user";


@Injectable()
export class RoleMock extends BaseMock<RoleM> {

    constructor(repository: RoleRepository, private readonly userMock: UserMock, private readonly shopMock: ShopMock) {
        const samples = [
            {role: RoleEnum.OWNER}
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { shop?: boolean, user?: boolean }) {
        const result = {shop: undefined as ShopM, user: undefined as UserM}
        if (!except?.shop) {
            result.shop = await this.shopMock.createMock(0)
        }
        if (!except?.user) {
            result.user = await this.userMock.createMock(0)
        }
        return result

    }

    async createMock(index: number): Promise<RoleM> {
        const {user, shop} = await this.prepareDependencies()
        const sample = this.getSample(index)
        return this.createCustom({
            ...sample,
            userId: user.id,
            shopId: shop.id
        })
    }
}