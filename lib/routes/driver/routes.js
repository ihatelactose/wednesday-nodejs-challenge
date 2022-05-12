import Joi from '@hapi/joi';
import { createOneDriver } from 'daos/driverDao';
import { stringSchema } from 'utils/validationUtils';

module.exports = [
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'Create a new Driver',
            notes: 'Creates a new Driver',
            tags: ['api', 'driver'],
            auth: false,
            validate: {
                payload: Joi.object({
                    first_name: stringSchema,
                    last_name: stringSchema,
                    current_location: stringSchema
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { firstName, lastName, currentLocation } =
                    request.payload;

                const newDriver = await createOneDriver({
                    firstName,
                    lastName,
                    currentLocation
                });

                return h.response({ driver: newDriver });
            } catch (error) {
                return h.response({ error });
            }
        }
    }
];
