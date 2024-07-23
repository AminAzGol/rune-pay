import {BaseM} from "./base";
import {OrderStatusEnum} from "../enum/order-status.enum";

export class OrderM extends BaseM {
    shopId: number
    totalPrice: number
    customerName: string
    customerAddress: string
    customerEmail: string
    status: OrderStatusEnum
}