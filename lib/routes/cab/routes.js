import Joi from '@hapi/joi';
import {
    numberSchema,
    stringSchema,
    stringSchemaOptional
} from 'utils/validationUtils';
import {
    createOneCab,
    findAllCabs,
    findOneCab,
    updateOneCab
} from 'daos/cabDao';
import { findOneDriver } from 'daos/driverDao';
import { sequelize } from 'models';
import { badRequest, notFound } from '@hapi/boom';

module.exports = [
    {
        method: 'GET',
        path: '/{cabId}/details',
        options: {
            description: 'Gets the details of a cab',
            notes: 'Get details of a cab',
            tags: ['api', 'cabs'],
            auth: false
        },
        handler: async (request, h) => {
            const cabId = request.params.cabID;
            const cab = await findOneCab(cabId);

            if (!cab) {
                return notFound('This cab was not found!');
            }

            return h.response({ cab });
        }
    },
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
        }
    },
    {
        method: 'GET',
        path: '/{cabType}',
        options: {
            description: 'Get all the cabs or with conditions',
            notes: 'Get all the cabs',
            tags: ['api', 'cabs'],
            auth: false
        },
        handler: async (request, h) => {
            const cabType = request.params.cabType;

            const types = ['bike', 'auto', 'sedan', 'premier'];
            if (!types.includes(cabType)) {
                return badRequest('This is not a valid cab_type!');
            }

            const allCabs = await findAllCabs({
                cabType
            });

            return h.response({ cabs: allCabs });
        }
    }
];
