module.exports = function (sequelize, DataTypes) {
    const Cab = sequelize.define(
        'cabs',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            driverId: {
                field: 'driver_id_fk',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            cabType: {
                field: 'cab_type',
                type: DataTypes.ENUM('bike', 'auto', 'sedan', 'premier'),
                allowNull: false
            },
            cabNumber: {
                field: 'cab_number',
                type: DataTypes.STRING(32),
                allowNull: false
            }
        },
        {
            tableName: 'cabs'
        }
    );

    Cab.associate = function (models) {};

    return Cab;
};
