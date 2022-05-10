module.exports = function (sequelize, DataTypes) {
    const Booking = sequelize.define(
        'bookings',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            fromLocation: {
                field: 'from_location',
                type: DataTypes.GEOMETRY('POINT', 4326),
                allowNull: false
            },
            toLocation: {
                field: 'to_location',
                type: DataTypes.GEOMETRY('POINT', 4326),
                allowNull: false
            },
            byUser: {
                field: 'by_user',
                type: DataTypes.INTEGER(11)
            }
        },
        {
            tableName: 'bookings'
        }
    );

    Booking.associate = function (models) {
        Booking.belongsTo(models.users);
    };

    return Booking;
};
