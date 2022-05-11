const { migrate } = require('utils/migrateUtils');

module.exports = {
    up: async queryInterface => migrate(__filename, queryInterface),
    down: async queryInterface => {
        await queryInterface.dropTable('cabs');
    }
};
