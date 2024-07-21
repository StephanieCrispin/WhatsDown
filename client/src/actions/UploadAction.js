import * as UploadApi from "../api/UploadRequest";

// export const GetPost =()=>async(dispatch)=>{
//   dispatch("GET_POSTS_START")
//   try{
//     const {data} = await UploadApi.uploadPost(formData)
//   }
// }

export const UploadPost = (formData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(formData);
    console.log(newPost);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLAOD_FAIL" });
  }
};
