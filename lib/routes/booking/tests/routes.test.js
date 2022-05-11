import { mockData } from 'utils/mockData';
import { resetAndMockDB } from 'utils/testUtils';

const { MOCK_BOOKING: booking } = mockData;

describe('/bookings route tests', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return booking;
                }
            });
        });
    });

    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/booking/1'
        });

        expect(res.statusCode).toEqual(200);
    });
});
