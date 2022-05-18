const dotenv = require('dotenv');

module.exports = () => {
    if (process.env.ENVIRONMENT_NAME !== 'prod') {
        dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });
    } else {
        // dotenv.config();
    }
};
