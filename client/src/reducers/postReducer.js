//TODO:  Does this not mean that my initial action then should be to get all user posts from the API and populate the posts

const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };

    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true, loading: false };

    case "RETRIEVING_START":
      return { ...state, loading: true, error: false };
    case "RETRIEVING_SUCCESS":
      console.log(action.data);
      return {
        ...state,
        loading: false,
        posts: [...action.data, ...state.posts],
        error: false,
      };
    case "RETRIEVING_FAILED":
      return { ...state, loading: false, error: true };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, posts: [], loading: false, error: false };
    default:
      return state;
  }
};

export default postReducer;
