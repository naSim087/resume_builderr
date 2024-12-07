import * as UserApi from '../api/ChangeAction';

export const sendConnectionRequest = (userId, currentUser) => async (dispatch) => {
  try {
    await UserApi.sendConnectionRequest(userId, currentUser);
    dispatch({ type: "SEND_CONNECTION_REQUEST", payload: userId });
  } catch (error) {
    console.log(error);
  }
};

export const cancelConnectionRequest = (userId, currentUser) => async (dispatch) => {
  try {
    await UserApi.cancelConnectionRequest(userId, currentUser);
    dispatch({ type: "CANCEL_CONNECTION_REQUEST", payload: userId });
  } catch (error) {
    console.log(error);
  }
};