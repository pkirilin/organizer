import {
  ACTIVITY_GROUPS_REQUEST,
  ACTIVITY_GROUPS_SUCCESS,
  ACTIVITY_GROUPS_ERROR,
} from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case ACTIVITY_GROUPS_REQUEST:
      return state;
    case ACTIVITY_GROUPS_SUCCESS:
      return action.groups;
    case ACTIVITY_GROUPS_ERROR:
      return state;
    default:
      return state;
  }
}
