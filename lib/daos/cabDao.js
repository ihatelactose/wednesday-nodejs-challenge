import { cabs } from 'models';

const attributes = ['id', 'driver_id_fk', 'cab_type', 'cab_number'];

/**
 * Creates a cab based on the data the user provides
 * @param {object} data the information provided by the user
 * @returns the newly created cab
 */
export const createOneCab = async data => {
    const { driverId, cabType, cabNumber } = data;
    return await cabs.create({
        driverId,
        cabType,
        cabNumber
    });
};

/**
 * Updates a cab based on the data the user provides
 * @param {object} data the information provided by the user
 * @returns the newly updated cab
 */
export const updateOneCab = async (cabId, update) =>
    await cabs.update(update, {
        where: {
            id: cabId
        }
    });

/**
 * Finds a cab based on the id the user provides
 * @param {object} cabId the information provided by the user
 * @returns the found cab or null
 */
export const findOneCab = async cabId =>
    cabs.findOne({
        attributes,
        where: {
            id: cabId
        },
        underscoredAll: false
    });