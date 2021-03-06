import { findOneBooking } from 'daos/bookingDao';
import { findOneCab } from 'daos/cabDao';
import { findOneDriver } from 'daos/driverDao';
import { findOneUser } from 'daos/userDao';
import { redisCacheType } from 'utils/cacheConstants';

export const cachedUser = async server => {
    await server.method('findOneUser', findOneUser, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};

export const cachedBooking = async server => {
    await server.method('findOneBooking', findOneBooking, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};

export const cachedDriver = async server => {
    await server.method('findOneDriver', findOneDriver, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};

export const cachedCab = async server => {
    await server.method('findOneCab', findOneCab, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};
