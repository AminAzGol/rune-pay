import {BaseM} from "./base";
import {EncryptedPassword, RawPassword} from "../types/auth/password-types";

export class UserM extends BaseM {
    email: string

}

export type UserWithPassword = UserM & { password: EncryptedPassword }
export type UserWithRawPassword = UserM & { password: RawPassword }
