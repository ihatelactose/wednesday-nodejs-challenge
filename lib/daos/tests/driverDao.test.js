import { mockData } from 'utils/mockData';
import { findOneDriver } from 'daos/driverDao';

describe('Booking DAOs', () => {
    const { MOCK_DRIVER: mockDriver } = mockData;

    describe('findOneDriver', () => {
        it('should find a driver by driverId', async () => {
            const driver = await findOneDriver(1);

            expect(driver.id).toEqual(1);
            expect(driver.firstName).toEqual(mockDriver.firstName);
            expect(driver.lastName).toEqual(mockDriver.lastName);
            expect(driver.driverStatus).toEqual(mockDriver.driverStatus);
            expect(driver.currentLocation).toEqual(mockDriver.currentLocation);
        });
    });
});
