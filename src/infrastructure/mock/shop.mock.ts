import {BaseMock} from "./base.mock";
import {ShopM} from "../../domain/model/shop";
import {ShopRepository} from "../repositories/shop.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ShopMock extends BaseMock<ShopM> {

    constructor(repository: ShopRepository) {
        const mockSamples = [
            {name: 'amazon'},
            {name: 'shopify'}
        ]
        super(repository, mockSamples);
    }
}