import * as api from '../api/indexRequests';

export const getTimelinePosts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.getTimelinePosts(userId);
    dispatch({ type: "FETCH_TIMELINE_POSTS", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "END_LOADING" });
  }
};
