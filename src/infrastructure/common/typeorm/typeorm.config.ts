import {default as loadConfiguration} from '../config/load_environment_config';

type TypeOrmConfigType = {
    type: string
    host: string
    port: number,
    username: string,
    password: string,
    database: string,
    entities: string[],
    synchronize: boolean,
    schema: string,
    migrationsRun: boolean,
    migrationsTableName: string,
    migrations: string[],
    autoLoadEntities: boolean,
}

export class TypeOrmConfigSingleton {
    private static customConfig: Partial<TypeOrmConfigType>;
    private static instance: TypeOrmConfigType

    public static getTypeOrmConfig() {
        if (!this.instance) {
            this.instance = this.getDefault()
            if (this.customConfig) {
                this.customizeInstance(this.customConfig)
            }
        }
        return this.instance
    }

    public static setCustomConfig(custom: Partial<TypeOrmConfigType>) {
        this.customConfig = custom
    }

    private static getDefault(): TypeOrmConfigType {
        const configData = loadConfiguration();
        return {
            type: 'postgres' as any,
            host: configData.database.host,
            port: parseInt(configData.database.port),
            username: configData.database.username,
            password: configData.database.password,
            database: configData.database.name,
            entities: [__dirname + './../../**/*.entity{.ts,.js}'],
            synchronize: configData.database.synchronize,
            schema: configData.database.schema,
            migrationsRun: configData.database.migrationsRun,
            migrationsTableName: 'database_migrations',
            migrations: ['migrations/**/*{.ts,.js}'],
            autoLoadEntities: true,
        }
    }

    private static customizeInstance(customConfig: Partial<TypeOrmConfigType>) {
        for (const key of Object.keys(customConfig)) {
            this.instance[key] = customConfig[key]
        }
    }

}