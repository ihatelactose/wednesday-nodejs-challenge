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

    // Sequelize is undefined when the create query is fired
    // need to find a way to fix it
    it('should create a new driver', async () => {
        await server.inject({
            method: 'POST',
            url: '/driver',
            payload: {
                first_name: 'John',
                last_name: 'Doe',
                current_location: '[18.479759440702946, 73.90242886592246]'
            }
        });
    });
});
