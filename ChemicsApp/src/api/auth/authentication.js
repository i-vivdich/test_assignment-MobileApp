import { post } from '../fetch';

export const login = data => {
  return post('/auth/signin', { email: data.email, password: data.password });
};

export const createAccount = data => {
  return post('/auth/signup', { username: data.username, email: data.email, password: data.password });
};

export const restorePass = data => {
  return post('/password', { email: data.email, username: data.username });
}