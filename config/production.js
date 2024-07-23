module.exports = {
    port: 3000,
    database: {
        type: 'postgres',
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        name: process.env.PG_DB,
        schema: 'public',
        synchronize: true,
        logging: false,
        migrations_run: false,
    },
}