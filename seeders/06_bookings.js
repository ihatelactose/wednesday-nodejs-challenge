module.exports = {
    up: (queryInterface, Sequelize) => {
        const arr = [
            {
                id: 1,
                from_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(74.74289221807756 19.095417023308773)'
                    ),
                    4326
                ),
                to_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(39.90242886592246 -76.47975944070295)'
                    ),
                    4326
                ),
                user_id: 1,
                created_at: '2022-05-12 06:19:21'
            },
            {
                id: 2,
                from_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(73.90242886592246 18.47975944070295)'
                    ),
                    4326
                ),
                to_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(23.838435441668835 78.73242053002151)'
                    ),
                    4326
                ),
                user_id: 2,
                created_at: '2022-05-12 06:19:21'
            },
            {
                id: 3,
                from_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(78.73242053002151 23.838435441668835)'
                    ),
                    4326
                ),
                to_location: Sequelize.fn(
                    'ST_SRID',
                    Sequelize.fn(
                        'ST_GeomFromText',
                        'POINT(39.90242886592246 -76.47975944070295)'
                    ),
                    4326
                ),
                user_id: 1,
                created_at: '2022-05-12 06:19:21'
            }
        ];
        return queryInterface.bulkInsert('bookings', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('bookings', null, {})
};
