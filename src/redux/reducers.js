import {SET_CURRENT_COURSE_NAME} from './actions';

const initialState = {};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_COURSE_NAME:
      return {...state, currentCourseName: action.payload};
    default:
      return state;
  }
}

export default taskReducer;
