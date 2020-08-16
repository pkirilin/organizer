import { combineReducers } from 'redux';
import activityGroups from './activityGroups.reducer';
import activities from './activities.reducer';
import operations from './operations.reducer';

export default combineReducers({
  activities,
  activityGroups,
  operations,
});
