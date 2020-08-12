import { apiUri } from '../config';

export const ACTIVITIES_REQUEST = 'ACTIVITIES_REQUEST';
export const ACTIVITIES_SUCCESS = 'ACTIVITIES_SUCCESS';
export const ACTIVITIES_ERROR = 'ACTIVITIES_ERROR';

export const getActivityItems = () => {
  const request = () => ({ type: ACTIVITIES_REQUEST });
  const success = activityItems => ({ type: ACTIVITIES_SUCCESS, activityItems });
  const error = () => ({ type: ACTIVITIES_ERROR });

  return async dispatch => {
    dispatch(request());

    try {
      const response = await fetch(`${apiUri}/activities`);

      if (!response.ok) {
        return dispatch(error());
      }

      const activityItems = await response.json();
      return dispatch(success(activityItems));
    } catch (e) {
      return dispatch(error());
    }
  };
};
