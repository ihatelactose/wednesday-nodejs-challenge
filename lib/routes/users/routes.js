import Joi from '@hapi/joi';
import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { createOneUser, findAllUser } from 'daos/userDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';
import { emailSchema, numberSchema, stringSchema } from 'utils/validationUtils';

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
                    firstName: stringSchema,
                    lastName: stringSchema,
                    email: emailSchema,
                    id: numberSchema,
                    oauth_client_id: numberSchema
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { firstName, lastName, email, id, oauth_client_id } =
                    request.payload;
                const user = await createOneUser({
                    id,
                    firstName,
                    lastName,
                    email,
                    oauth_client_id
                });

                return h.response({ user });
            } catch (error) {
                console.error(error);
                return badImplementation();
            }
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
            return findAllUser(page, limit)
                .then(users => {
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
                })
                .catch(error => badImplementation(error.message));
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
