import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigModule} from "../common/typeorm/typeorm-config.module";
import {DatabaseHealthRepository} from "./databaseHealthRepository";
import {HealthEntity} from "../entities/health.entity";

@Module({
    imports: [
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([
            HealthEntity
        ]),
    ],
    providers: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: DatabaseHealthRepository
        }

    ],
    exports: [
        {
            provide: 'HEALTH_REPOSITORY',
            useClass: DatabaseHealthRepository
        }
    ]
})
export class RepositoriesModule {
}