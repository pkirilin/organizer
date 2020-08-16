import { httpClient } from '../utils';

export const CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';

export const UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_ERROR = 'UPDATE_ACTIVITY_ERROR';

export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_ERROR = 'DELETE_ACTIVITY_ERROR';

export const createActivity = activity => {
  const request = message => ({ type: CREATE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: CREATE_ACTIVITY_SUCCESS });
  const error = () => ({ type: CREATE_ACTIVITY_ERROR });

  return async dispatch => {
    dispatch(request('Creating activity...'));
    await httpClient.postAsync('/activities', activity, () => dispatch(error()));
    return dispatch(success());
  };
};

export const updateActivity = (activityId, activity) => {
  const request = message => ({ type: UPDATE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: UPDATE_ACTIVITY_SUCCESS });
  const error = () => ({ type: UPDATE_ACTIVITY_ERROR });

  return async dispatch => {
    dispatch(request('Updating activity...'));
    await httpClient.putAsync(`/activities/${activityId}`, activity, () => dispatch(error()));
    return dispatch(success());
  };
};

export const deleteActivity = activityId => {
  const request = message => ({ type: DELETE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: DELETE_ACTIVITY_SUCCESS });
  const error = () => ({ type: DELETE_ACTIVITY_ERROR });

  return async dispatch => {
    dispatch(request('Deleting activity...'));
    await httpClient.deleteAsync(`/activities/${activityId}`, () => dispatch(error()));
    return dispatch(success());
  };
};
