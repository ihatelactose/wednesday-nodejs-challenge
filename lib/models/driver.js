module.exports = function (sequelize, DataTypes) {
    const Driver = sequelize.define(
        'drivers',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            currentLocation: {
                field: 'current_location',
                type: DataTypes.GEOMETRY('POINT', 4326),
                allowNull: false
            }
        },
        {
            tableName: 'drivers'
        }
    );

    Driver.associate = function (models) {};

    return Driver;
};
