import type {TypeOrmModuleAsyncOptions, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import typeORMConfig from './typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return typeORMConfig;
            },
        }as TypeOrmModuleAsyncOptions),
    ],
})
export class TypeOrmConfigModule {}
