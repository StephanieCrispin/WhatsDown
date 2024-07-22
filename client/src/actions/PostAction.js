import * as PostApi from "../api/PostsRequest.js";

export const getTimelinePosts = (userId) => async (dispatch) => {
  dispatch({ type: "RETRIEVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(userId);
    // So we can pass in fields or data or variables into our action and we will have it available and accesible on that reducer's action
    dispatch({ type: "RETRIEVING_SUCCESS", data: data.data });
  } catch (error) {
    dispatch({ type: "RETRIEVING_FAILED" });
    console.log(error);
  }
};
