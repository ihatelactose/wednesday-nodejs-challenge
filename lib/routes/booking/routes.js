import Joi from '@hapi/joi';
import { numberSchema, stringSchema } from 'utils/validationUtils';
import { createOneBooking, findOneBooking } from 'daos/bookingDao';
import { badImplementation } from '@hapi/boom';

module.exports = [
    {
        method: 'GET',
        path: '/{bookingId}',
        options: {
            description:
                'Create one booking based on the locations provided by user',
            notes: 'CREATE one booking',
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
                const booking = await createOneBooking({
                    fromLocation,
                    toLocation,
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
