import {Module} from "@nestjs/common";
import {CryptographyService} from "./cryptography-service";
import {JwtModule} from "@nestjs/jwt";
import {EnvironmentConfigModule} from "../../common/config/environment_config.module";

@Module({
    imports: [JwtModule, EnvironmentConfigModule],
    providers: [CryptographyService],
    exports: [CryptographyService]
})
export class CryptographyModule {
}