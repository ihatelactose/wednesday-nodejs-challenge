import { mockData } from 'utils/mockData';
import { findOneBooking } from 'daos/bookingDao';

describe('Booking DAOs', () => {
    const { MOCK_BOOKING: mockBooking } = mockData;
    // const attributes = ['id', 'fromLocation', 'toLocation', 'byUser'];

    describe('findOneBooking', () => {
        it('should find a booking by bookingId', async () => {
            const testBooking = await findOneBooking(1);

            expect(testBooking.id).toEqual(1);
            expect(testBooking.fromLocation).toEqual(mockBooking.fromLocation);
            expect(testBooking.toLocation).toEqual(mockBooking.toLocation);
            expect(testBooking.byUser).toEqual(mockBooking.byUser);
        });
    });
});
