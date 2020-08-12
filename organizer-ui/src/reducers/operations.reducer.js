import {
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_ERROR,
} from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_ACTIVITY_REQUEST:
      return {
        isPerforming: true,
        message: action.message,
      };
    case CREATE_ACTIVITY_SUCCESS:
      return {};
    case CREATE_ACTIVITY_ERROR:
      return {};
    default:
      return state;
  }
}
