import httpClient from '../http.utils';
import { apiUri } from '../../config';

const expectedFetchedData = { firstName: 'John', lastName: 'Smith' };

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(expectedFetchedData),
  }),
);

beforeEach(() => {
  fetch.mockClear();
});

describe('httpClient', () => {
  const address = '/address';
  const method = 'METHOD';
  const expectedHeaders = {
    'Content-Type': 'application/json',
  };

  describe('sendAsync', () => {
    test('should send some body when data is specified', async () => {
      const data = { test: 'test' };

      const response = await httpClient.sendAsync(address, method, data);
      const result = await response.json();

      expect(result).toBe(expectedFetchedData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${apiUri}${address}`, {
        method,
        headers: expectedHeaders,
        body: JSON.stringify(data),
      });
    });

    test('should send no body when data is not specified', async () => {
      const response = await httpClient.sendAsync(address, method);
      const result = await response.json();

      expect(result).toBe(expectedFetchedData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${apiUri}${address}`, {
        method,
        headers: expectedHeaders,
        body: null,
      });
    });
  });
});
