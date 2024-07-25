import {BaseM} from "./base";

export class UserM extends BaseM {
    email: string
    password: string
}

export type UserAttributes = Omit<UserM, keyof BaseM>;