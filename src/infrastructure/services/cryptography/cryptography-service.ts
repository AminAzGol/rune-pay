import {compare, hash} from "bcrypt";
import {JwtService} from '@nestjs/jwt';
import {EncryptedPassword, RawPassword} from "../../../domain/types/auth/password-types";
import {Inject} from "@nestjs/common";
import {JwtTokenDetails} from "../../../domain/types/auth/jwt-token-details";
import {EnvironmentConfigService} from "../../common/config/environment_config.service";

export class CryptographyService {
    constructor(
        @Inject(JwtService)
        private readonly jwtService: JwtService,
        private readonly environmentConfigService: EnvironmentConfigService
    ) {
    }

    public async encryptPassword(pw: RawPassword): Promise<EncryptedPassword> {
        return await hash(pw, 10);
    }

    public async comparePassword(rawPassword: RawPassword, encryptedPassword: EncryptedPassword) {
        return await compare(rawPassword, encryptedPassword);
    }

    public async signUserJwtToken(payload: JwtTokenDetails): Promise<string> {
        const config = this.environmentConfigService.getJwtConfig()
        const keys = this.environmentConfigService.getKeys()
        return this.jwtService.signAsync(payload, {
            privateKey: keys.privateKey,
            expiresIn: config.accessTokenExpire,
            algorithm: config.algorithm
        })
    }

    public async signRefreshToken(payload: JwtTokenDetails): Promise<string> {
        const config = this.environmentConfigService.getJwtConfig()
        const keys = this.environmentConfigService.getKeys()
        return this.jwtService.signAsync(payload, {
            privateKey: keys.privateKey,
            expiresIn: config.accessTokenExpire,
            algorithm: config.algorithm
        })
    }

    public async verify(token: string): Promise<JwtTokenDetails> {
        const config = this.environmentConfigService.getJwtConfig()
        const keys = this.environmentConfigService.getKeys()
        return this.jwtService.verifyAsync(token, {
            publicKey: keys.publicKey,
            algorithms: [config.algorithm]
        })
    }
}