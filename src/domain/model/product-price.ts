import {BaseM} from "./base";

export class ProductPriceM extends BaseM {
    productId: number
    price: number
    currencyId: number
    isActive: boolean
}