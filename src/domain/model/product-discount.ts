import {BaseM} from "./base";

export class ProductDiscountM extends BaseM {
    shopId: number
    productId: number
    type: string
    discountUnit: string
    discountValue: number
    couponCode: string
    expiresAt: Date
    isRedeemableAllowed: boolean
}