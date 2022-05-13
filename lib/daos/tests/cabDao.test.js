import { mockData } from 'utils/mockData';
import { findOneCab, findAllCabs, createOneCab } from 'daos/cabDao';

describe('Booking DAOs', () => {
    const { MOCK_CAB: mockCab } = mockData;

    describe('findOneCab', () => {
        it('should find a cab by cabId', async () => {
            const cab = await findOneCab(1);

            expect(cab.id).toEqual(1);
            expect(cab.cabNumber).toEqual(mockCab.cabNumber);
            expect(cab.cabType).toEqual(mockCab.cabType);
            expect(cab.driverId).toEqual(mockCab.driverId);
        });
    });

    describe('findAllCabs', () => {
        it('should be able to find an array of cabs', async () => {
            const res = await findAllCabs(1, 10);
            const firstCab = res[0];

            expect(firstCab.id).toEqual(1);
            expect(firstCab.cabNumber).toEqual(mockCab.cabNumber);
            expect(firstCab.cabType).toEqual(mockCab.cabType);
            expect(firstCab.driverId).toEqual(mockCab.driverId);
        });

        it('should be able to find an array of cabs with given conditions', async () => {
            const where = { cabType: 'bike' };
            const res = await findAllCabs(1, 10, where);
            const firstCab = res[0];

            expect(firstCab.id).toEqual(1);
            expect(firstCab.cabNumber).toEqual(mockCab.cabNumber);
            expect(firstCab.cabType).toEqual('bike');
            expect(firstCab.driverId).toEqual(mockCab.driverId);
        });
    });

    describe('createOneCab', () => {
        it('should be able to create a cab', async () => {
            const id = 1;
            const type = 'bike';
            const number = 'SOMECAB123';
            const cab = await createOneCab({
                driverId: id,
                cabType: type,
                cabNumber: number
            });

            expect(cab.id).toEqual(id);
            expect(cab.cabType).toEqual(type);
            expect(cab.cabNumber).toEqual(number);
        });
    });
});
