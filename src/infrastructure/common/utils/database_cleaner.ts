import {DataSource} from 'typeorm';
import typeORMConfig from '../../common/typeorm/typeorm.config';

let appDataSource: DataSource;

async function initDataSource() {
    appDataSource = new DataSource(typeORMConfig);
    await appDataSource.initialize();
}

export default {
    /**
     * @param name must be table name (not an entity class name)
     */
    async clearTable(name: string) {
        if (!appDataSource) {
            await initDataSource();
        }
        const schema = appDataSource.driver.schema;
        await appDataSource.query(`TRUNCATE ${schema}.${name} RESTART IDENTITY CASCADE;`);
    },

    async clearDB() {
        if (!appDataSource) {
            await initDataSource();
        }
        const promises = [];

        const {
            entityMetadatas,
            driver: {schema},
        } = appDataSource;

        for (const entityMetadata of entityMetadatas) {
            const repository = appDataSource.getRepository(entityMetadata.name);
            const count = await repository.count();
            if (count > 0) {
                promises.push(repository.query(`TRUNCATE TABLE ${schema}.${entityMetadata.tableName} RESTART IDENTITY CASCADE;`));
            }
        }

        await Promise.all(promises)
    },

    async closeDB() {
        if (!appDataSource) {
            return;
        }
        await appDataSource.destroy();
    },
};
