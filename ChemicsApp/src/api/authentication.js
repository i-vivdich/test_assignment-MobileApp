import { post } from './fetch';

export const login = (email, password) => {
  return post('/api/auth/signin', { email, password });
};

export const createAccount = (username, email, password) => {
  return post('/api/auth/signup', { username, email, password });
};
