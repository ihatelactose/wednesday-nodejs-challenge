module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        url: process.env.DB_URI,
        host: process.env.MYSQL_HOST,
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
