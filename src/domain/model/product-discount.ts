import {BaseM} from "./base";
import {ProductDiscountTypeEnum} from "../enum/product-discount-type.enum";

export class ProductDiscountM extends BaseM {
    shopId: number
    productId: number
    type: ProductDiscountTypeEnum
    discountUnit: string
    discountValue: number
    couponCode: string
    expiresAt: Date
    isRedeemableAllowed: boolean
}