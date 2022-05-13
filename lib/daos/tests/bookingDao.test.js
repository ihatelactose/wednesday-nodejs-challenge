import { mockData } from 'utils/mockData';
import { findAllBookings, findOneBooking } from 'daos/bookingDao';

describe('Booking DAOs', () => {
    const { MOCK_BOOKING: mockBooking } = mockData;

    describe('findOneBooking', () => {
        it('should find a booking by bookingId', async () => {
            const testBooking = await findOneBooking(1);

            expect(testBooking.id).toEqual(1);
            expect(testBooking.fromLocation).toEqual(mockBooking.fromLocation);
            expect(testBooking.toLocation).toEqual(mockBooking.toLocation);
            expect(testBooking.userId).toEqual(mockBooking.userId);
        });
    });

    describe('findAllBookings', () => {
        it('should be able to find an array of bookings', async () => {
            const { allBookings } = await findAllBookings(1, 10);
            const firstBooking = allBookings[0];

            expect(firstBooking.id).toEqual(1);
            expect(firstBooking.fromLocation).toEqual(mockBooking.fromLocation);
            expect(firstBooking.toLocation).toEqual(mockBooking.toLocation);
            expect(firstBooking.userId).toEqual(mockBooking.userId);
        });
    });
});
