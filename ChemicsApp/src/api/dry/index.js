import { get } from '../fetch';

export const getDries = () => {
    return get('/api/dries');
};