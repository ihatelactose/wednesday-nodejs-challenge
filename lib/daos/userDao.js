import { users } from 'models';

const attributes = [
    'id',
    'first_name',
    'last_name',
    'email',
    'oauth_client_id'
];

/**
 * Creates a user based on the data the user provides
 * @param {object} data the information provided by the user
 * @returns the newly created user
 */
export const createOneUser = async data => {
    const { firstName, lastName, email, id, oauthClientId } = data;
    return await users.create({
        id,
        firstName,
        lastName,
        email,
        oauth_client_id: oauthClientId
    });
};

export const findOneUser = async userId =>
    users.findOne({
        attributes,
        where: {
            id: userId
        },
        underscoredAll: false
    });

export const findAllUser = async (page, limit) => {
    const where = {};
    const totalCount = await users.count({ where });
    const allUsers = await users.findAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });
    return { allUsers, totalCount };
};
