import {SET_USER_ID, SET_EXAM_DATA} from './actions';

const initialState = {
  examData: {},
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return {...state, userId: action.payload};
    case SET_EXAM_DATA:
      return {...state, examData: action.payload};
    default:
      return state;
  }
}

export default taskReducer;
