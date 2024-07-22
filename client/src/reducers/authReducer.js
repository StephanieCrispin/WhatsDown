const authReducer = (
  // Loading and error here are variables that we will be
  // accessing globally and will also change based on an action
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    // I may or may not remove this later

    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAILED":
      return { ...state, loading: false, error: true };
    // TODO: Check if this logout is also contributing to the bug on his app where I cannot log in
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    default:
      return state;
  }
};

export default authReducer;
