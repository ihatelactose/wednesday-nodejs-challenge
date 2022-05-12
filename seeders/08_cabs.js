module.exports = {
    up: queryInterface => {
        const arr = [
            {
                id: 1,
                driver_id: 1,
                cab_type: 'bike',
                cab_number: 'SOMEBIKE'
            },
            {
                id: 2,
                driver_id: 2,
                cab_type: 'sedan',
                cab_number: 'SOMESEDAN'
            },
            {
                id: 3,
                driver_id: 3,
                cab_type: 'premier',
                cab_number: 'SOMEPREMIER'
            }
        ];
        return queryInterface.bulkInsert('cabs', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('cabs', null, {})
};
