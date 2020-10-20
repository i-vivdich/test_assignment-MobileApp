import { post } from './fetch';

export const login = (data) => {
  return post('/auth/signin', { email: data.email, password: data.password });
};

export const createAccount = ({ username, email, password }) => {
  return post('/auth/signup', { username, email, password });
};
