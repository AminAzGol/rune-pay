import {TypeOrmConfigSingleton} from "../common/typeorm/typeorm.config";
import {Client as PgClient} from "pg";

export class Pg {
    private client


    constructor() {
    }

    async createSchema(schemaName) {
        await (await this.getClient()).query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`)
    }

    async dropSchema(schemaName) {
        await (await this.getClient()).query(`DROP SCHEMA ${schemaName} CASCADE`)
    }

    public async closeConnection() {
        await this.client.end()
    }

    public async connect() {
        if (!this.client) {
            const {username, password, host, port, database} = TypeOrmConfigSingleton.getTypeOrmConfig()
            this.client = new PgClient({
                user: username,
                password,
                host,
                port,
                database
            })
            this.client.connect()
        }
        return this.client
    }

    public async clearAllTables(schema) {
        const tableNames = await this.getTableNames(schema)
        for (const table of tableNames) {
            await this.client.query(`TRUNCATE TABLE ${schema}.${table} RESTART IDENTITY CASCADE;`)
        }
    }

    private async getTableNames(schema) {
        const result = await this.client.query(`select tableName from pg_catalog.pg_tables where schemaname='${schema}';`)
        return result.rows.map(o => o.tablename)
    }

    private async getClient(): Promise<PgClient> {
        if (!this.client) {
            await this.connect()
        }
        return this.client
    }
}