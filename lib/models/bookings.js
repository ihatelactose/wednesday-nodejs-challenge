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
                type: DataTypes.STRING(32),
                allowNull: false
            },
            toLocation: {
                type: DataTypes.STRING(32),
                allowNull: false
            },
            byUser: {
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
