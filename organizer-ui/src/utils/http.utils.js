import { apiUri } from '../config';

function createHttpClient(baseUri) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  function sendAsync(address, method, data) {
    return fetch(`${baseUri}${address}`, {
      method: method,
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : null,
    });
  }

  return {
    sendAsync,
    getAsync: address => sendAsync(address, 'GET'),
    postAsync: (address, data) => sendAsync(address, 'POST', data),
    putAsync: (address, data) => sendAsync(address, 'PUT', data),
    deleteAsync: address => sendAsync(address, 'DELETE'),
  };
}

export default createHttpClient(apiUri);
