import API_URL from '../config/secret';
import { getToken } from '../async_storage/token';

const getHeaders = async () => {
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['x-access-token'] = token;
  }

  return headers;
};

export const post = async (destination, body) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  
  if (result.ok) {
    // console.log("RESPONSE", await result.json())
    return await result.json();
  }

  throw { error: result.status , message: result.message };
};

export const patch = async (destination, body) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });

  if (result.ok) {
    return await result.json();
  }

  throw { error: result.status , message: result.message };
};

export const get = async (destination) => {
  const headers = await getHeaders();

  const result = await fetch(`${API_URL}${destination}`, {
    method: 'GET',
    headers,
  });

  if (result.ok) {
    return await result.json();
  }

  throw { error: result.status };
};
