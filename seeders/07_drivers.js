module.exports = {
    up: (queryInterface, Sequelize) => {
        const arr = [
            {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                current_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(20.008123684130044 73.68422502766143)'
                    ),
                    4326
                )
            },
            {
                id: 2,
                first_name: 'Jane',
                last_name: 'Doe',
                current_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(20.024001913827338 73.71330700158782)'
                    ),
                    4326
                )
            },
            {
                id: 3,
                first_name: 'Clark',
                last_name: 'Doe',
                current_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(19.98436489126486 73.73295698397054)'
                    ),
                    4326
                )
            }
        ];
        return queryInterface.bulkInsert('drivers', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('drivers', null, {})
};
