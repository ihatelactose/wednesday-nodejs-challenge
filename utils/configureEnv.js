const dotenv = require('dotenv');

module.exports = () => {
    // if (process.env.ENVIRONMENT_NAME !== 'prod') {
    console.log({ e: process.env.ENVIRONMENT_NAME });
    dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });
    // } else {
    //     // dotenv.config();
    // }
};
