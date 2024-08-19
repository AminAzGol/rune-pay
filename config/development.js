const fs = require("fs");
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
    jwt: {
        algorithm: 'RS256',
        accessTokenExpire: '2h',
        refreshTokenExpire: '1d',
    },
    keys: {
        privateKey: process.env.PRIVATE_KEY,
        publicKey: process.env.PUBLIC_KEY
    }
}