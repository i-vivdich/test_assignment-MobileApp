import { get, post, patch } from '../fetch';

export const getDries = () => {
    return get('/api/dries');
};

export const saveDry = (data) => {
    return post('/api/dries', data);
}

export const saveServices = (data) => {
    return patch(`/api/dries/${data.id}`, { services: data.services })
}
export const getServicesByDry = (data) => {
    return post('/api/dries/services', data);
}
