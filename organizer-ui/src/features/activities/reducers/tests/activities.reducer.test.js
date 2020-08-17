import activitiesReducer from '../activities.reducer';
import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_ERROR,
  ACTIVITIES_SUCCESS,
} from '../../activities.constants';

describe('activitiesReducer', () => {
  const testState = [
    {
      _id: '1',
      date: '2020-08-16',
      title: 'test 1',
    },
    {
      _id: '2',
      date: '2020-08-17',
      title: 'test 2',
    },
  ];

  test('should return current state on unknown action', () => {
    testState.forEach(item => {
      expect(activitiesReducer(testState, { type: 'UNKNOWN' })).toContain(item);
    });
  });

  test(`should return current state on ${ACTIVITIES_REQUEST}`, () => {
    testState.forEach(item => {
      expect(activitiesReducer(testState, { type: ACTIVITIES_REQUEST })).toContain(item);
    });
  });

  test(`should return current state on ${ACTIVITIES_ERROR}`, () => {
    testState.forEach(item => {
      expect(activitiesReducer(testState, { type: ACTIVITIES_ERROR })).toContain(item);
    });
  });

  test(`should return activities on ${ACTIVITIES_SUCCESS}`, () => {
    const activities = [
      {
        _id: 1,
        date: '2020-08-17',
        title: 'test 1',
      },
      {
        _id: 2,
        date: '2020-08-18',
        title: 'test 2',
      },
    ];
    expect(activitiesReducer([], { type: ACTIVITIES_SUCCESS, activities })).toBe(activities);
  });
});
