import { combineReducers } from 'redux';
import activitiesReducer from './activities.reducer';
import operationsReducer from './operations.reducer';

export default combineReducers({
  activityGroups: activitiesReducer,
  operations: operationsReducer,
});
