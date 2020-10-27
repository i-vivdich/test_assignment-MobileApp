import { get, post } from '../fetch';

export const getServices = (data) => {
    return post('/api/services', data);
};

export const getAllServices = () => {
    return get('/api/services');
}
