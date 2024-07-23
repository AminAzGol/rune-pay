import { default as loadConfiguration } from '../config/load_environment_config';

const configData = loadConfiguration();

export default {
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
};
