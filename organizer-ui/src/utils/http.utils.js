import { apiUri } from '../config';

function createHttpClient(baseUri) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  async function sendAsync(address, method, data, handleError = null) {
    try {
      return await fetch(`${baseUri}${address}`, {
        method: method,
        headers: defaultHeaders,
        body: data ? JSON.stringify(data) : null,
      });
    } catch (e) {
      handleError();
    }
  }

  return {
    sendAsync,
    getAsync: async (address, handleError = null) => {
      const response = await sendAsync(address, 'GET');
      if (!response.ok && handleError) {
        handleError(response);
      }
      return await response.json();
    },
    postAsync: (address, data, handleError = null) => sendAsync(address, 'POST', data, handleError),
    putAsync: (address, data, handleError = null) => sendAsync(address, 'PUT', data, handleError),
    deleteAsync: (address, handleError = null) => sendAsync(address, 'DELETE', handleError),
  };
}

export default createHttpClient(apiUri);
