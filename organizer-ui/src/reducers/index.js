import { combineReducers } from 'redux';
import activitiesReducer from './activities.reducer';

export default combineReducers({
  activities: activitiesReducer,
});
