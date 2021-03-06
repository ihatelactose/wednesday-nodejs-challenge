import Joi from '@hapi/joi';
import get from 'lodash/get';
import { notFound } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { createOneUser, findAllUser } from 'daos/userDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';
import { emailSchema, numberSchema, stringSchema } from 'utils/validationUtils';
import { findAllBookings } from 'daos/bookingDao';

module.exports = [
    {
        method: 'POST',
        path: '/register',
        options: {
            description: 'Register a user with the application',
            notes: 'User Registration',
            tags: ['api', 'users'],
            cors: true,
            auth: false,
            validate: {
                payload: Joi.object({
                    first_name: stringSchema,
                    last_name: stringSchema,
                    email: emailSchema,
                    id: numberSchema,
                    oauth_client_id: numberSchema
                })
            }
        },
        handler: async (request, h) => {
            const { firstName, lastName, email, id, oauthClientId } =
                request.payload;
            const user = await createOneUser({
                id,
                firstName,
                lastName,
                email,
                oauthClientId
            });

            return h.response({ user });
        }
    },
    {
        method: 'GET',
        path: '/{userId}/bookings',
        options: {
            description: 'Get all the past bookings of a user',
            notes: 'Find all past bookings',
            tags: ['api', 'users'],
            auth: false
        },
        handler: async (request, h) => {
            const { page, limit } = request.query;
            const userId = request.params.userId;

            return findAllBookings(parseInt(page), parseInt(limit), {
                userId
            }).then(bookings => {
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
        path: '/{userId}',
        options: {
            description: 'get one user by ID',
            notes: 'GET users API',
            tags: ['api', 'users'],
            cors: true
        },
        handler: async request => {
            const userId = request.params.userId;
            return server.methods.findOneUser(userId).then(user => {
                if (!user) {
                    return notFound(`No user was found for id ${userId}`);
                }
                return user;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { page, limit } = request.query;
            return findAllUser(page, limit).then(users => {
                if (get(users.allUsers, 'length')) {
                    const totalCount = users.totalCount;
                    const allUsers = transformDbArrayResponseToRawResponse(
                        users.allUsers
                    ).map(user => user);

                    return h.response({
                        results: allUsers,
                        totalCount
                    });
                }
                return notFound('No users found');
            });
        },
        options: {
            description: 'get all users',
            notes: 'GET users API',
            tags: ['api', 'users'],
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        }
    }
];
