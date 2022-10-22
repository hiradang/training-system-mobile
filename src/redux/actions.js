export const SET_USER_ID = 'SET_USER_ID';

export const setUserId = userId => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: userId,
  });
};
