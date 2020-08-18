import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getActivities } from '../activities.actions';
import { ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS, ACTIVITIES_ERROR } from '../activities.constants';
import { apiUri } from '../../../config';

const createTestStore = configureStore([thunk]);
const store = createTestStore({});

function setupSuccessFetch(data) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    }),
  );
}

function setupErrorFetch() {
  global.fetch = jest.fn(() => {
    Promise.resolve({
      ok: false,
    });
  });
}

describe('getActivities action creator', () => {
  afterEach(() => {
    fetch.mockClear();
    store.clearActions();
  });

  test('should dispatch ACTIVITIES_REQUEST, then ACTIVITIES_SUCCESS if fetch is successful', async () => {
    const date = '2020-08-18';
    const expectedActivities = [
      {
        _id: '1',
        date: '2020-08-18',
        title: 'title 1',
      },
      {
        _id: '2',
        date: '2020-08-18',
        title: 'title 2',
      },
    ];
    const expectedActions = [
      { type: ACTIVITIES_REQUEST },
      { type: ACTIVITIES_SUCCESS, activities: expectedActivities },
    ];
    setupSuccessFetch(expectedActivities);

    await store.dispatch(getActivities({ date }));

    expect(store.getActions()).toEqual(expectedActions);
    expect(fetch).toBeCalledWith(`${apiUri}/activities?date=${date}`, {
      body: null,
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    expect(fetch).toBeCalledTimes(1);
  });

  test('should dispatch ACTIVITIES_REQUEST, then ACTIVITIES_ERROR if fetch is not successful', async () => {
    const date = '2020-08-18';
    const expectedActions = [{ type: ACTIVITIES_REQUEST }, { type: ACTIVITIES_ERROR }];
    setupErrorFetch();

    await store.dispatch(getActivities({ date }));

    expect(store.getActions()).toEqual(expectedActions);
    expect(fetch).toBeCalledWith(`${apiUri}/activities?date=${date}`, {
      body: null,
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    expect(fetch).toBeCalledTimes(1);
  });
});
