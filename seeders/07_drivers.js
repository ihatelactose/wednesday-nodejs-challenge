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
                        'POINT(32.266352974636945 75.65718674685253)'
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
                        'POINT(73.90242886592246 18.47975944070295)'
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
                        'POINT(25.419239462610268 86.12775708338279)'
                    ),
                    4326
                )
            }
        ];
        return queryInterface.bulkInsert('drivers', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('drivers', null, {})
};
