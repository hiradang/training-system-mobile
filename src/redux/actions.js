export const SET_USER_ID = 'SET_USER_ID';
export const SET_EXAM_DATA = 'SET_EXAM_DATA';

export const setUserId = userId => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: userId,
  });
};

export const setExamData = examData => dispatch => {
  dispatch({
    type: SET_EXAM_DATA,
    payload: examData,
  });
};
