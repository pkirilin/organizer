import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ActivitiesList } from '../ActivitiesList';

const createTestStore = configureStore([thunk]);

const testActivities = [
  {
    _id: '1',
    date: '2020-08-01',
    title: 'title 1',
  },
  {
    _id: '2',
    date: '2020-08-01',
    title: 'title 2',
  },
  {
    _id: '3',
    date: '2020-08-01',
    title: 'title 3',
  },
];

describe('ActivitiesList component', () => {
  test('should render activities when activities are not empty', () => {
    const getActivities = jest.fn();
    const testStore = createTestStore({});

    const result = render(
      <Provider store={testStore}>
        <ActivitiesList
          date="2020-08-01"
          activities={testActivities}
          getActivities={getActivities}
        ></ActivitiesList>
      </Provider>,
    );

    testActivities.forEach(a => {
      result.getByText(a.title);
    });

    expect(getActivities).toBeCalledTimes(1);
    expect(getActivities).toBeCalledWith({ date: '2020-08-01' });
  });
});
