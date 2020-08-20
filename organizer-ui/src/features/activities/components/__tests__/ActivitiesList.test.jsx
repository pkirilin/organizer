import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ActivitiesList } from '../ActivitiesList';
import { ActivityInputDialog } from '../ActivityInputDialog';
import { ActivityDeleteDialog } from '../ActivityDeleteDialog';
import { TableCell, IconButton } from '@material-ui/core';

const createTestStore = configureStore();

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
  test('should display activities when activities are not empty', () => {
    const wrapper = shallow(
      <ActivitiesList
        date="2020-08-01"
        activities={testActivities}
        getActivities={jest.fn()}
      ></ActivitiesList>,
    );

    testActivities.forEach(a => {
      expect(wrapper.containsMatchingElement(<TableCell>{a.title}</TableCell>)).toBeTruthy();
    });
  });

  test('should fetch activities when mounted', () => {
    const getActivities = jest.fn();
    const store = createTestStore();

    mount(
      <Provider store={store}>
        <ActivitiesList
          date="2020-08-01"
          activities={testActivities}
          getActivities={getActivities}
        ></ActivitiesList>
      </Provider>,
    );

    expect(getActivities).toBeCalledTimes(1);
    expect(getActivities).toBeCalledWith({ date: '2020-08-01' });
  });

  test('should display hidden dialogs when mounted', () => {
    const store = createTestStore();

    const wrapper = mount(
      <Provider store={store}>
        <ActivitiesList
          date="2020-08-01"
          activities={testActivities}
          getActivities={jest.fn()}
        ></ActivitiesList>
      </Provider>,
    );

    expect(
      wrapper.containsMatchingElement(
        <ActivityInputDialog title="Edit activity" isOpened={false}></ActivityInputDialog>,
      ),
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <ActivityDeleteDialog
          isOpened={false}
          deleteActivity={jest.fn()}
          getActivities={jest.fn()}
          getActivityGroups={jest.fn()}
        ></ActivityDeleteDialog>,
      ),
    );
  });

  test('should open edit dialog on click edit', () => {
    const store = createTestStore();

    const wrapper = mount(
      <Provider store={store}>
        <ActivitiesList
          date="2020-08-01"
          activities={testActivities}
          getActivities={jest.fn()}
        ></ActivitiesList>
      </Provider>,
    );
    wrapper.find(IconButton).first().simulate('click');

    expect(
      wrapper.containsMatchingElement(
        <ActivityInputDialog title="Edit activity" isOpened={true}></ActivityInputDialog>,
      ),
    ).toBeTruthy();
  });
});
