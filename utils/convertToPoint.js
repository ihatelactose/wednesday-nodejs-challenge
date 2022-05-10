export const convertToPoint = serializedPoint => ({
    type: 'Point',
    coordinates: JSON.parse(serializedPoint)
});
