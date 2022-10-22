import {SET_USER_ID} from './actions';

const initialState = {};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return {...state, userId: action.payload};
    default:
      return state;
  }
}

export default taskReducer;
