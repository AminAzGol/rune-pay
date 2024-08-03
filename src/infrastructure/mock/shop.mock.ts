import {BaseMock} from "./base.mock";
import {ShopM} from "../../domain/model/shop";
import {ShopRepository} from "../repositories/providers/shop.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ShopMock extends BaseMock<ShopM> {

    alreadyCreated: { [key: number]: ShopM } = {}

    constructor(repository: ShopRepository) {
        const mockSamples = [
            {name: 'amazon'},
            {name: 'shopify'}
        ]
        super(repository, mockSamples);
    }

    async createMock(index): Promise<ShopM> {
        if (this.alreadyCreated[index]) {
            try {
                const existing = await this.repository.findById(this.alreadyCreated[index].id)
                if (existing) {
                    return existing
                }
            } catch (e) {
            }
        }
        const sample = this.getSample(index)
        const result = await this.createCustom(sample)
        this.alreadyCreated[index] = result
        return result
    }
}