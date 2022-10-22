export const SET_CURRENT_COURSE_NAME = 'SET_CURRENT_COURSE_NAME';

export const setCurrentCourseName = currentCourseName => dispatch => {
  dispatch({
    type: SET_CURRENT_COURSE_NAME,
    payload: currentCourseName,
  });
};
