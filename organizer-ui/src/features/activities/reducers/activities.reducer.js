import { ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS, ACTIVITIES_ERROR } from '../activities.constants';

export default function (state = [], action) {
  switch (action.type) {
    case ACTIVITIES_REQUEST:
      return state;
    case ACTIVITIES_SUCCESS:
      return action.activities;
    case ACTIVITIES_ERROR:
      return state;
    default:
      return state;
  }
}
