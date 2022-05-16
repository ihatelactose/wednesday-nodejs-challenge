module.exports = {
    development: {
        url: process.env.MYSQL_ENDPOINT,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_MASTER_PASSWORD,
        username: process.env.MYSQL_MASTER_USERNAME,
        logging: true,
        dialect: 'mysql',
        pool: {
            min: 0,
            max: 10,
            idle: 10000
        },
        define: {
            userscored: true,
            timestamps: false
        }
    }
};
