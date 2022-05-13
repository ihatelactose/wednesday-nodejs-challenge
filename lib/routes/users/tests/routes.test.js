import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_USER: user, MOCK_BOOKING: booking } = mockData;

describe('/user route tests ', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return user;
                }
            });
        });
    });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/users/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/users/2'
        });
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No user was found for id 2');
    });

    it('should return all the users ', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return user;
                }
            });
        });

        const res = await server.inject({
            method: 'GET',
            url: '/users'
        });

        expect(res.statusCode).toEqual(200);
        const userOne = res.result.results[0];
        expect(userOne.id).toEqual(user.id);
        expect(userOne.first_name).toEqual(user.firstName);
        expect(userOne.last_name).toEqual(user.lastName);
        expect(userOne.email).toEqual(user.email);
        expect(userOne.oauth_client_id).toEqual(user.oauth_client_id);
        expect(res.result.total_count).toEqual(1);
    });

    it('should return notFound if no users are found', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.users.findAll = () => null;
        });
        const res = await server.inject({
            method: 'GET',
            url: '/users'
        });
        expect(res.statusCode).toEqual(404);
    });

    it('should return badImplementation if findAllUsers fails', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return null;
                }
            });
            allDbs.users.findAll = () =>
                new Promise((resolve, reject) => {
                    reject(new Error());
                });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/users'
        });
        expect(res.statusCode).toEqual(500);
    });

    it('should return all past bookings of a user', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return user;
                }
            });
        });

        const res = await server.inject({
            method: 'GET',
            url: '/users/1/bookings?page=1&limit=10'
        });

        expect(res.statusCode).toEqual(200);

        const bookingOne = res.result.all_bookings[0];
        const totalCount = res.result.total_count;

        expect(bookingOne.id).toEqual(booking.id);
        expect(bookingOne.from_location).toEqual(booking.fromLocation);
        expect(bookingOne.to_location).toEqual(booking.toLocation);
        expect(parseInt(bookingOne.user_id)).toEqual(booking.userId);
        expect(totalCount).toEqual(1);
    });

    it('should create a new user', async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return user;
                }
            });
        });

        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'john@doe.com';
        const id = 2;
        const oauth_client_id = 2;

        const res = await server.inject({
            method: 'POST',
            url: '/users/register',
            payload: {
                first_name: firstName,
                last_name: lastName,
                email,
                id,
                oauth_client_id
            }
        });

        const user = res.result.user;

        expect(user.id).toEqual(id);
        expect(user.firstName).toEqual(firstName);
        expect(user.lastName).toEqual(lastName);
        expect(user.email).toEqual(email);
        expect(user.oauth_client_id).toEqual(oauth_client_id);
    });
});
