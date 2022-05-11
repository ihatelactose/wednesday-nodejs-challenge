import { badImplementation } from '@hapi/boom';
import Joi from '@hapi/joi';
import { createOneBooking, findOneBooking } from 'daos/bookingDao';
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
                    toLocation: stringSchema,
                    fromLocation: stringSchema,
                    userId: numberSchema
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { toLocation, fromLocation, userId } = request.payload;
                await createOneBooking({ toLocation, fromLocation, userId });

                return h.response({ status: 'Booking created successfully!' });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    }
];
