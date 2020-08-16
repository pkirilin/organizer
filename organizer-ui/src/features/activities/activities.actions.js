import { httpClient } from '../../utils';
import * as ActionTypes from './activities.constants';

export const getActivityGroups = () => {
  const request = () => ({ type: ActionTypes.ACTIVITY_GROUPS_REQUEST });
  const success = groups => ({ type: ActionTypes.ACTIVITY_GROUPS_SUCCESS, groups });
  const error = () => ({ type: ActionTypes.ACTIVITY_GROUPS_ERROR });

  return async dispatch => {
    dispatch(request());
    try {
      const response = await httpClient.getAsync('/activities/groups');
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
  const request = () => ({ type: ActionTypes.ACTIVITIES_REQUEST });
  const success = activities => ({ type: ActionTypes.ACTIVITIES_SUCCESS, activities });
  const error = () => ({ type: ActionTypes.ACTIVITIES_ERROR });

  return async dispatch => {
    try {
      dispatch(request());
      let query = '';
      if (date) query += `date=${date}`;
      const response = await httpClient.getAsync(`/activities?${query}`);
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

export const createActivity = activity => {
  const request = message => ({ type: ActionTypes.CREATE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: ActionTypes.CREATE_ACTIVITY_SUCCESS });
  const error = () => ({ type: ActionTypes.CREATE_ACTIVITY_ERROR });

  return async dispatch => {
    try {
      dispatch(request('Creating activity...'));
      const response = await httpClient.postAsync('/activities', activity);
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
  const request = message => ({ type: ActionTypes.UPDATE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: ActionTypes.UPDATE_ACTIVITY_SUCCESS });
  const error = () => ({ type: ActionTypes.UPDATE_ACTIVITY_ERROR });

  return async dispatch => {
    try {
      dispatch(request('Updating activity...'));
      const response = await httpClient.putAsync(`/activities/${activityId}`, activity);
      if (!response.ok) {
        return dispatch(error());
      }
      return dispatch(success());
    } catch (e) {
      return dispatch(error());
    }
  };
};

export const deleteActivity = activityId => {
  const request = message => ({ type: ActionTypes.DELETE_ACTIVITY_REQUEST, message });
  const success = () => ({ type: ActionTypes.DELETE_ACTIVITY_SUCCESS });
  const error = () => ({ type: ActionTypes.DELETE_ACTIVITY_ERROR });

  return async dispatch => {
    try {
      dispatch(request('Deleting activity...'));
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
