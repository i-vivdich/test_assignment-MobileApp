import { get, patch, post } from '../fetch';

export const postOrder = (data) => {
    return post('/api/orders', data);
};

export const getOrders = (id) => {
    return get(`/api/orders/${id}`);
};

export const getAllOrders = (data) => {
    return post('/api/orders/all', data)
}

export const getOrder = (data) => {
    return post('/api/orders/current', data)
}

export const updateOrder = (data) => {
    return patch(`/api/orders/${data.id}`, data);
}
