module.exports = {
    port: 3000,
    database: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        name: 'rune_pay',
        schema: 'public',
        synchronize: true,
        logging: false,
        migrations_run: false,
    },
}