import { bookings } from 'models';
import { sequelize } from 'models';

const attributes = ['id', 'fromLocation', 'toLocation', 'userId'];

/**
 * Creates a booking based on the data the user provides
 * @param {object} data the pickup to destination provided by the user
 * @returns the new created booking
 */
export const createOneBooking = async data => {
    const { toLocation, fromLocation, userId } = data;

    // The Lat and Lng will be sent as a stringified array
    // for both to and from location, which can then be parsed
    // and be used to reference and create points
    const parsedToLocation = JSON.parse(toLocation);
    const parsedFromLocation = JSON.parse(fromLocation);

    const booking = await bookings.create({
        fromLocation: sequelize.fn(
            'ST_SRID',
            sequelize.fn(
                'ST_GeomFromText',
                `POINT(${parsedFromLocation[1]} ${parsedFromLocation[0]})`
            ),
            4326
        ),
        toLocation: sequelize.fn(
            'ST_SRID',
            sequelize.fn(
                'ST_GeomFromText',
                `POINT(${parsedToLocation[1]} ${parsedToLocation[0]})`
            ),
            4326
        ),
        userId
    });

    return { booking };
};

/**
 * Finds a booking based on the bookingId the user provides
 * @param {number} bookingId the bookingId of the booking which needs to be searched
 * @returns the found booking or else null
 */
export const findOneBooking = async bookingId => {
    const booking = await bookings.findOne({
        attributes,
        where: {
            id: bookingId
        }
    });

    return booking;
};

/**
 * Returns all the bookings present in the bookings table
 * @param {number} page the page which is to be returned
 * @param {number} limit the limit to which the pagination should occur
 * @param {object} where the where clause that is to be used in the sql query
 * @returns all the bookings present or just an empty array
 */
export const findAllBookings = async (page, limit, where = {}) => {
    const { count, rows } = await bookings.findAndCountAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });

    return { allBookings: rows, totalCount: count };
};
