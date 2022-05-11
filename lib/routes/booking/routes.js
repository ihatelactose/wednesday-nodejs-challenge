import { badImplementation } from '@hapi/boom';
import Joi from '@hapi/joi';
import {
    createOneBooking,
    findAllBookings,
    findOneBooking
} from 'daos/bookingDao';
import { numberSchema, stringSchema } from 'utils/validationUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{bookingId}',
        options: {
            description:
                'Find one booking based on the bookingId provided by the user',
            notes: 'Find one booking',
            tags: ['api', 'booking'],
            auth: false
        },
        handler: async (request, h) => {
            try {
                const bookingId = request.params.bookingId;
                const booking = await findOneBooking(bookingId);

                return h.response({ booking });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    },
    {
        method: 'GET',
        path: '/{userId}/bookings',
        options: {
            description: 'Get all the past bookings of a user',
            notes: 'Find all past bookings',
            tags: ['api', 'booking'],
            auth: false
        },
        handler: async (request, h) => {
            try {
                const userId = request.params.userId;
                const bookings = await findAllBookings(1, 10, {
                    userId
                });

                return h.response({ bookings });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    },
    {
        method: 'POST',
        path: '/',
        options: {
            description:
                'Create one booking based on the locations provided by user',
            notes: 'CREATE one booking',
            tags: ['api', 'booking'],
            auth: false,
            validate: {
                payload: Joi.object({
                    to_location: stringSchema,
                    from_location: stringSchema,
                    user_id: numberSchema
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { toLocation, fromLocation, userId } = request.payload;

                const booking = await createOneBooking({
                    toLocation,
                    fromLocation,
                    userId
                });

                return h.response({ booking });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    }
];
