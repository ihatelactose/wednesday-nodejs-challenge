import { badImplementation } from '@hapi/boom';
import Joi from '@hapi/joi';
import {
    numberSchema,
    stringSchema,
    stringSchemaOptional
} from 'utils/validationUtils';
import { createOneCab, findOneCab, updateOneCab } from 'daos/cabDao';
import { findOneDriver } from 'daos/driverDao';
import { sequelize } from 'models';

module.exports = [
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'Create a new Cab',
            notes: 'Creates a new Cab',
            tags: ['api', 'cabs'],
            auth: false,
            validate: {
                payload: Joi.object({
                    driver_id: numberSchema,
                    cab_type: stringSchema,
                    cab_number: stringSchema
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { driverId, cabType, cabNumber } = request.payload;

                // Check if the driver exists in the database
                const driverExists = await findOneDriver(driverId);
                if (!driverExists) {
                    return h.response({
                        errors: [{ message: 'This driver does not exist.' }]
                    });
                }

                const newCab = await createOneCab({
                    driverId,
                    cabNumber,
                    cabType
                });

                return h.response({ cab: newCab });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    },
    {
        method: 'POST',
        path: '/nearby',
        options: {
            description: 'Get all cabs nearby provided location',
            notes: 'Find all cabs',
            tags: ['api', 'cabs'],
            auth: false,
            validate: {
                payload: Joi.object({
                    current_location: stringSchema,
                    radius: numberSchema
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { currentLocation, radius } = request.payload;
                const parsedCurrentLocation = JSON.parse(currentLocation);

                const nearby = await sequelize.query(
                    `
                        SELECT 
                            first_name, 
                            ST_Distance_Sphere(current_location, ST_GeomFromText('POINT(:lng :lat)', 4326)) AS "distance_m"
                        FROM drivers
                        HAVING distance_m <= :rad
                    `,
                    {
                        replacements: {
                            lat: parsedCurrentLocation[0],
                            lng: parsedCurrentLocation[1],
                            rad: radius
                        }
                    }
                );

                return h.response({ cabsNearby: nearby[0] });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    },
    {
        method: 'PUT',
        path: '/{cabId}',
        options: {
            description: 'Update cab details',
            notes: 'Updates Cab details',
            tags: ['api', 'cabs'],
            auth: false,
            validate: {
                payload: Joi.object({
                    cab_type: stringSchemaOptional,
                    cab_number: stringSchemaOptional
                })
            }
        },
        handler: async (request, h) => {
            try {
                const cabId = request.params.cabId;
                const cabExists = await findOneCab(cabId);
                if (!cabExists) {
                    return h.response({
                        errors: [{ message: 'This cab does not exist!' }]
                    });
                }

                const { cabType, cabNumber } = request.payload;

                const update = {};
                if (cabType) {
                    update.cabType = cabType;
                }

                if (cabNumber) {
                    update.cabNumber = cabNumber;
                }

                const updatedCab = await updateOneCab(cabId, update);
                return h.response({ cab: updatedCab });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
        }
    }
];