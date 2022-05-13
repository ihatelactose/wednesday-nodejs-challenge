import { users, bookings, cabs, drivers } from 'models';
import { init } from '../lib/testServer';
import { mockData } from './mockData';
import { DEFAULT_METADATA_OPTIONS } from './constants';

export function configDB(metadataOptions = DEFAULT_METADATA_OPTIONS) {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();

    const userMock = DBConnectionMock.define('users', mockData.MOCK_USER);
    userMock.findByPk = query => users.findById(query);
    userMock.count = () => 1;

    const bookingMock = DBConnectionMock.define(
        'bookings',
        mockData.MOCK_BOOKING
    );
    bookingMock.findByPk = query => bookings.findById(query);
    bookingMock.count = () => 1;

    const cabMock = DBConnectionMock.define('cabs', mockData.MOCK_CAB);
    cabMock.findByPk = query => cabs.findById(query);
    cabMock.count = () => 1;

    const driverMock = DBConnectionMock.define('drivers', mockData.MOCK_DRIVER);
    driverMock.findByPk = query => drivers.findById(query);
    driverMock.count = () => 1;

    const oauthClientsMock = DBConnectionMock.define(
        'oauth_clients',
        mockData.MOCK_OAUTH_CLIENTS(metadataOptions)
    );
    oauthClientsMock.findOne = query => oauthClientsMock.findById(query);

    const oauthAccessTokensMock = DBConnectionMock.define(
        'oauth_access_tokens',
        mockData.MOCK_OAUTH_ACCESS_TOKENS
    );
    oauthAccessTokensMock.create = mutation =>
        new Promise(resolve => resolve({ ...mutation }));

    const oauthClientResourcesMock = DBConnectionMock.define(
        'oauth_client_resources',
        mockData.MOCK_OAUTH_CLIENT_RESOURCES[0]
    );
    oauthClientResourcesMock.findOne = query =>
        oauthClientResourcesMock.findById(query);

    oauthClientResourcesMock.findAll = query =>
        oauthClientResourcesMock.findById(query);

    const oauthClientScopesMock = DBConnectionMock.define(
        'oauth_client_scopes',
        mockData.MOCK_OAUTH_CLIENT_SCOPES
    );

    oauthClientScopesMock.findOne = query =>
        oauthClientScopesMock.findById(query);

    oauthClientScopesMock.findAll = query =>
        oauthClientScopesMock.findById(query);
    return {
        cabs: cabMock,
        users: userMock,
        drivers: driverMock,
        bookings: bookingMock,
        oauth_clients: oauthClientsMock,
        oauth_access_tokens: oauthAccessTokensMock,
        oauth_client_resources: oauthClientResourcesMock,
        oauth_client_scopes: oauthClientScopesMock
    };
}

export async function bustDB() {
    // this will clear all the entries in your tables
    await users.sync({ force: true });
    await bookings.sync({ force: true });
    await cabs.sync({ force: true });
    await drivers.sync({ force: true });
}

export async function mockDB(
    mockCallback = () => {},
    metadataOptions = DEFAULT_METADATA_OPTIONS
) {
    jest.doMock('models', () => {
        const sequelizeData = configDB(metadataOptions);
        if (mockCallback) {
            mockCallback(sequelizeData);
        }
        return sequelizeData;
    });
}

export const resetAndMockDB = async (
    mockDBCallback = () => {},
    metadataOptions = DEFAULT_METADATA_OPTIONS
) => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
    await mockDB(mockDBCallback, metadataOptions);
    const server = await init();
    return server;
};
