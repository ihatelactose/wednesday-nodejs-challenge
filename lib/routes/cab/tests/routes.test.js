import { mockData } from 'utils/mockData';
import { resetAndMockDB } from 'utils/testUtils';

const { MOCK_CAB: cab } = mockData;

describe('/cab route tests', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(allDbs =>
            allDbs.cabs.$queryInterface.$useHandler(function (query) {
                if (query === 'findById') {
                    return cab;
                }
            })
        );
    });

    it('should return 200 on a valid cab_type', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/cab/bike'
        });

        expect(res.statusCode).toEqual(200);
    });

    it('should return 400 on an invalid cab_type', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/cab/ship'
        });

        expect(res.statusCode).toEqual(400);
        expect(res.result.message).toEqual('This is not a valid cab_type!');
    });

    it('should update cabs', async () => {
        const updatedtype = 'auto';

        const res = await server.inject({
            method: 'put',
            url: '/cab/1',
            payload: {
                cab_type: updatedtype
            }
        });

        expect(res.statusCode).toEqual(200);
    });

    it('should update cabs', async () => {
        const updatednumber = 'updatednumber123';

        const res = await server.inject({
            method: 'put',
            url: '/cab/1',
            payload: {
                cab_number: updatednumber
            }
        });

        expect(res.statusCode).toEqual(200);
    });

    it('should return details of a cab', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/cab/1/details'
        });

        const thisCab = res.result.cab;

        expect(thisCab.cabType).toEqual(cab.cabType);
        expect(thisCab.cabNumber).toEqual(cab.cabNumber);
    });

    it('should show driver does not exist if there is no driver', async () => {
        const cabType = 'bike';
        const cabNumber = 'SOMEBIKE';
        const res = await server.inject({
            method: 'POST',
            url: '/cab',
            payload: {
                driver_id: 999,
                cab_type: cabType,
                cab_number: cabNumber
            }
        });

        const errors = res.result.errors;

        expect(res.statusCode).toEqual(404);
        expect(errors[0].message).toEqual('This driver does not exist.');
    });
});
