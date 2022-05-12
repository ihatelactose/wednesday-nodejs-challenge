import { mockData } from 'utils/mockData';
import { resetAndMockDB } from 'utils/testUtils';

const { MOCK_BOOKING: booking } = mockData;

describe('/bookings route tests', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(allDbs =>
            allDbs.bookings.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return booking;
                }
            })
        );
    });

    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/booking/1'
        });

        expect(res.statusCode).toEqual(200);
    });

    it('should return all the bookings', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/booking'
        });

        expect(res.statusCode).toEqual(200);

        const bookingOne = res.result.all_bookings[0];
        const totalCount = res.result.total_count;

        expect(bookingOne.id).toEqual(booking.id);
        expect(bookingOne.from_location).toEqual(booking.fromLocation);
        expect(bookingOne.to_location).toEqual(booking.toLocation);
        expect(bookingOne.user_id).toEqual(booking.userId);
        expect(totalCount).toEqual(1);
    });
});
