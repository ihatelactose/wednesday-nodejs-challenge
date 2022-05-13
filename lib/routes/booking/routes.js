import Joi from '@hapi/joi';
import {
    createOneBooking,
    findAllBookings,
    findOneBooking
} from 'daos/bookingDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';
import { numberSchema, stringSchema } from 'utils/validationUtils';

module.exports = [
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Find all bookings',
            notes: 'Find all booking',
            tags: ['api', 'booking'],
            auth: false,
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        },
        handler: async (request, h) => {
            const { page, limit } = request.query;
            return findAllBookings(page, limit).then(bookings => {
                const totalCount = bookings.totalCount;
                const allBookings = transformDbArrayResponseToRawResponse(
                    bookings.allBookings
                ).map(book => book);

                return h.response({
                    allBookings,
                    totalCount
                });
            });
        }
    },
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
            const bookingId = request.params.bookingId;
            const booking = await findOneBooking(bookingId);

            return h.response({ booking });
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
            const { toLocation, fromLocation, userId } = request.payload;

            const booking = await createOneBooking({
                toLocation,
                fromLocation,
                userId
            });

            return h.response({ booking });
        }
    }
];
