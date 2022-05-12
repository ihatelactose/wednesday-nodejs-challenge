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
        const updatedType = 'auto';
        const updatedNumber = 'updatednumber123';

        const res = await server.inject({
            method: 'PUT',
            url: '/cab/1',
            payload: {
                cab_type: updatedType,
                cab_number: updatedNumber
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
});
