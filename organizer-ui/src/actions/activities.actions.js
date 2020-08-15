import { apiUri } from '../config';

export const ACTIVITIES_REQUEST = 'ACTIVITIES_REQUEST';
export const ACTIVITIES_SUCCESS = 'ACTIVITIES_SUCCESS';
export const ACTIVITIES_ERROR = 'ACTIVITIES_ERROR';

export const getActivityGroups = () => {
  const request = () => ({ type: ACTIVITIES_REQUEST });
  const success = groups => ({ type: ACTIVITIES_SUCCESS, groups });
  const error = () => ({ type: ACTIVITIES_ERROR });

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
