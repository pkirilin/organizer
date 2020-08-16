import { apiUri } from '../config';

export const ACTIVITY_GROUPS_REQUEST = 'ACTIVITY_GROUPS_REQUEST';
export const ACTIVITY_GROUPS_SUCCESS = 'ACTIVITY_GROUPS_SUCCESS';
export const ACTIVITY_GROUPS_ERROR = 'ACTIVITY_GROUPS_ERROR';

export const ACTIVITIES_REQUEST = 'ACTIVITIES_REQUEST';
export const ACTIVITIES_SUCCESS = 'ACTIVITIES_SUCCESS';
export const ACTIVITIES_ERROR = 'ACTIVITIES_ERROR';

export const getActivityGroups = () => {
  const request = () => ({ type: ACTIVITY_GROUPS_REQUEST });
  const success = groups => ({ type: ACTIVITY_GROUPS_SUCCESS, groups });
  const error = () => ({ type: ACTIVITY_GROUPS_ERROR });

  return async dispatch => {
    dispatch(request());

    try {
      const response = await fetch(`${apiUri}/activities/groups`);

      if (!response.ok) {
        return dispatch(error());
      }

      const groups = await response.json();
      return dispatch(success(groups));
    } catch (e) {
      return dispatch(error());
    }
  };
};

export const getActivities = ({ date }) => {
  const request = () => ({ type: ACTIVITIES_REQUEST });
  const success = activities => ({ type: ACTIVITIES_SUCCESS, activities });
  const error = () => ({ type: ACTIVITIES_ERROR });

  return async dispatch => {
    dispatch(request());

    let query = '';
    if (date) {
      query += `date=${date}`;
    }

    try {
      const response = await fetch(`${apiUri}/activities?${query}`);

      if (!response.ok) {
        return dispatch(error());
      }

      const activities = await response.json();
      return dispatch(success(activities));
    } catch (e) {
      return dispatch(error());
    }
  };
};
