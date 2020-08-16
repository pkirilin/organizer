import { combineReducers } from 'redux';
import {
  activitiesReducer,
  activityGroupsReducer,
  activityOperationsReducer,
} from '../features/activities';

export default combineReducers({
  activities: activitiesReducer,
  activityGroups: activityGroupsReducer,
  operations: activityOperationsReducer,
});
