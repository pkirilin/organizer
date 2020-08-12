import { apiUri } from '../config';

export const CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';

export const createActivity = activity => {
  const request = message => ({
    type: CREATE_ACTIVITY_REQUEST,
    message,
  });
  const success = () => ({ type: CREATE_ACTIVITY_SUCCESS });
  const error = () => ({ type: CREATE_ACTIVITY_ERROR });

  return async dispatch => {
    dispatch(request('Creating activity...'));

    try {
      const response = await fetch(`${apiUri}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        return dispatch(error());
      }

      return dispatch(success());
    } catch (error) {
      return dispatch(error());
    }
  };
};
