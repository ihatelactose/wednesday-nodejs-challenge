import {
    GRANT_TYPE,
    SCOPE_TYPE,
    OAUTH_CLIENT_ID,
    DEFAULT_METADATA_OPTIONS
} from './constants';

export const mockMetadata = (
    scope = SCOPE_TYPE.ADMIN,
    resourceType = OAUTH_CLIENT_ID
) => ({
    oauth_client_scope: {
        get: () => ({
            id: 1,
            oauth_client_id: 1,
            scope
        })
    },
    oauth_client_resources: [
        {
            get: () => ({
                id: 1,
                oauth_client_id: 1,
                resource_type: resourceType,
                resource_id: 1
            })
        }
    ]
});

export const mockData = {
    MOCK_USER: {
        id: 1,
        firstName: 'Sharan',
        lastName: 'Salian',
        email: 'sharan@wednesday.is',
        oauth_client_id: 1
    },
    MOCK_BOOKING: {
        id: 1,
        fromLocation: 'Delhi',
        toLocation: 'Mumbai',
        userId: 1
    },
    MOCK_CAB: {
        id: 1,
        driverId: 1,
        cabType: 'bike',
        cabNumber: 'WED14519DAY'
    },
    MOCK_DRIVER: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        driverStatus: 'open',
        currentLocation: 'POINT(73.90242886592246 18.47975944070295)'
    },
    MOCK_OAUTH_CLIENTS: (metadataOptions = DEFAULT_METADATA_OPTIONS) => ({
        id: 1,
        clientId: 'TEST_CLIENT_ID_1',
        clientSecret: 'TEST_CLIENT_SECRET',
        grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
        ...mockMetadata(metadataOptions.scope, metadataOptions.resourceType)
    }),
    MOCK_OAUTH_CLIENT_TWO: {
        id: 1,
        clientId: 'TEST_CLIENT_ID_1',
        clientSecret: 'TEST_CLIENT_SECRET',
        grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
        ...mockMetadata(SCOPE_TYPE.USER)
    },
    MOCK_OAUTH_CLIENT_SUPER_USER: {
        id: 1,
        clientId: 'TEST_CLIENT_ID_1',
        clientSecret: 'TEST_CLIENT_SECRET',
        grantType: GRANT_TYPE.CLIENT_CREDENTIALS,
        ...mockMetadata(SCOPE_TYPE.SUPER_ADMIN)
    },
    MOCK_OAUTH_CLIENT_RESOURCES: [
        {
            id: 1,
            oauthClientId: 'TEST_CLIENT_ID_1',
            resourceType: 'OAUTH_CLIENT_ID',
            resourceId: 1
        },
        {
            id: 1,
            oauthClientId: 'TEST_CLIENT_ID_1',
            resourceType: 'OAUTH_CLIENT_ID',
            resourceId: 1
        }
    ],
    MOCK_OAUTH_CLIENT_SCOPES: {
        id: 1,
        oauthClientId: 'TEST_CLIENT_ID_1',
        scope: SCOPE_TYPE.SUPER_ADMIN
    }
};

export const createMockTokenWithScope = (
    scope,
    resourceType = OAUTH_CLIENT_ID
) => ({
    oauthClientId: 'TEST_CLIENT_ID_1',
    metadata: {
        scope: mockMetadata(scope).oauth_client_scope.get(),
        resources: [
            mockMetadata(scope, resourceType).oauth_client_resources[0].get()
        ]
    }
});
