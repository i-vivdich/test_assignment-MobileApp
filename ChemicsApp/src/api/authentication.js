import { post } from './fetch';

export const login = (email, password) => {
  return post('/api/auth/signin', {
    user: { 'email': email, 'password': password }
  });
};

export const createAccount = (username, email, password) => {
  return post('/api/auth/signup', {
    user: { 'username': username, 'email': email, 'password': password }
  });
};
