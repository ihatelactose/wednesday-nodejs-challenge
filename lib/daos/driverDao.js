import { drivers } from 'models';
import { sequelize } from 'models';

const attributes = ['id', 'first_name', 'last_name', 'current_location'];

/**
 * Creates a driver based on the data the user provides
 * @param {object} data the information provided by the user
 * @returns the newly created driver
 */
export const createOneDriver = async data => {
    const { firstName, lastName, currentLocation } = data;
    const parsedCurrentLocation = JSON.parse(currentLocation);

    return await drivers.create({
        firstName,
        lastName,
        currentLocation: sequelize.fn(
            'ST_SRID',
            sequelize.fn(
                'ST_GeomFromText',
                `POINT(${parsedCurrentLocation[0]} ${parsedCurrentLocation[1]})`
            ),
            4326
        )
    });
};

/**
 * Finds a driver based on the id the user provides
 * @param {object} driverId the information provided by the user
 * @returns the found driver or null
 */
export const findOneDriver = async driverId =>
    drivers.findOne({
        attributes,
        where: {
            id: driverId
        }
    });
