import { badImplementation } from '@hapi/boom';
import { sequelize } from 'models';
import Joi from '@hapi/joi';
import { findOneBooking } from 'daos/bookingDao';
import { numberSchema, stringSchema } from 'utils/validationUtils';

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

                // The Lat and Lng will be sent as a stringified array
                // for both to and from location, which can then be parsed
                // and be used to reference and create points
                const parsedToLocation = JSON.parse(toLocation);
                const parsedFromLocation = JSON.parse(fromLocation);

                await sequelize.query(
                    `
                    INSERT INTO bookings VALUES
                     (
                        DEFAULT,
                        ST_SRID(ST_GeomFromText('POINT(:fromLat :fromLng)'), 4326),
                        ST_SRID(ST_GeomFromText('POINT(:toLat :toLng)'), 4326),
                        :userId
                     )
                `,
                    {
                        replacements: {
                            fromLat: parsedFromLocation[0],
                            fromLng: parsedFromLocation[1],
                            toLat: parsedToLocation[0],
                            toLng: parsedToLocation[1],
                            userId
                        }
                    }
                );

                return h.response({ status: 'Booking created successfully!' });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    }
];
