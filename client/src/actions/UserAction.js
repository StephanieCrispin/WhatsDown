import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: "FOLLOW_USER", data: id });
    UserApi.followUser(id, data);
  } catch (err) {
    console.log(err);
  }
};

export const unfollowUser = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: "UNFOLLOW_USER", data: id });
    UserApi.unfollowUser(id, data);
  } catch (err) {
    console.log(err);
  }
};
