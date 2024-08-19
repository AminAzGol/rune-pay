import {RoleEnum} from "../enum/role.enum";
import {BaseM} from "./base";

export class RoleM extends BaseM {
    userId: number
    shopId: number
    role: RoleEnum
}