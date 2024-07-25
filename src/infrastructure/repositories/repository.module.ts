import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigModule} from "../common/typeorm/typeorm-config.module";
import {HealthRepository} from "./health.repository";
import {HealthEntity} from "../entities/health.entity";
import {UserEntity} from "../entities/user.entity";
import {UserRepository} from "./user.repository";
import {CryptographyModule} from "../services/cryptography/cryptography.module";

@Module({
    imports: [
        CryptographyModule,
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([
            HealthEntity,
            UserEntity
        ]),
    ],
    providers: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository

    ],
    exports: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: HealthRepository
        },
        UserRepository
    ]
})
export class RepositoriesModule {
}