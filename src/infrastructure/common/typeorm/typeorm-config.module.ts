import type {TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {TypeOrmConfigSingleton} from './typeorm.config';
import {DataSourceOptions} from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return TypeOrmConfigSingleton.getTypeOrmConfig() as DataSourceOptions;
            },
        } as TypeOrmModuleAsyncOptions),
    ],
})
export class TypeOrmConfigModule {
}
