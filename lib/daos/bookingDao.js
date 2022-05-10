import { bookings } from 'models';

const attributes = ['id', 'fromLocation', 'toLocation', 'byUser'];

/**
 * Creates a booking based on the data the user provides
 * @param {object} data the pickup to destination provided by the user
 * @returns the new created booking
 */
export const createOneBooking = async data => {
    const { toLocation, fromLocation, userId } = data;
    const booking = await bookings.create({
        toLocation,
        fromLocation,
        byUser: userId
    });

    return booking;
};

/**
 * Finds a booking based on the bookingId the user provides
 * @param {string} bookingId the bookingId of the booking which needs to be searched
 * @returns the found booking or else null
 */
export const findOneBooking = async bookingId => {
    const booking = await bookings.findOne({
        attributes,
        where: {
            id: bookingId
        },
        underscoredAll: false
    });

    return booking;
};

/**
 * Returns all the bookings present in the bookings table
 * @param {number} page the page which is to be returned
 * @param {number} limit the limit to which the pagination should occur
 * @returns all the bookings present or just an empty array
 */
export const findAllBookings = async (page, limit) => {
    const where = {};
    const totalCount = await bookings.count({ where });
    const allBookings = await bookings.findAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });

    return { allBookings, totalCount };
};
