import { apiUri } from '../config';
import { createHttpClient } from '../utils';

export const CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';

export const UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_ERROR = 'UPDATE_ACTIVITY_ERROR';

export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_ERROR = 'DELETE_ACTIVITY_ERROR';

const httpClient = createHttpClient(apiUri);

export const createActivity = activity => {
  const request = message => ({ type: CREATE_ACTIVITY_REQUEST, message });
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
    } catch (e) {
      return dispatch(error());
    }
  };
};

export const updateActivity = (activityId, activity) => {
  const request = message => ({ type: UPDATE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: UPDATE_ACTIVITY_SUCCESS });
  const error = () => ({ type: UPDATE_ACTIVITY_ERROR });

  return async dispatch => {
    dispatch(request('Updating activity...'));

    try {
      const response = await httpClient.putAsync(`/activities/${activityId}`, activity);

      if (!response.ok) {
        return dispatch(error());
      }

      return dispatch(success());
    } catch (e) {
      console.log(e);
      return dispatch(error());
    }
  };
};

export const deleteActivity = activityId => {
  const request = message => ({ type: DELETE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: DELETE_ACTIVITY_SUCCESS });
  const error = () => ({ type: DELETE_ACTIVITY_ERROR });

  return async dispatch => {
    dispatch(request('Deleting activity...'));

    try {
      const response = await httpClient.deleteAsync(`/activities/${activityId}`);

      if (!response.ok) {
        return dispatch(error());
      }

      return dispatch(success());
    } catch (e) {
      return dispatch(error());
    }
  };
};
