import {compare, hash} from "bcrypt";

export class CryptographyService {

    constructor() {
    }

    public async encryptPassword(pw) {
        return await hash(pw, 10);
    }

    public async comparePassword(rawPassword, encryptedPassword) {
        return await compare(rawPassword, encryptedPassword);
    }

}