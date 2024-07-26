import React, { useRef, useState } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/defaultProfile.png";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../utilities/firebase";
import { UploadPost } from "../../actions/UploadAction";
import toast, { Toaster } from "react-hot-toast";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const uploading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();
  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();
  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const imageRef = storage.ref().child(image?.name);

      const snapshot = await imageRef.put(image);
      const downloadURL = await snapshot.ref.getDownloadURL();
      newPost.image = downloadURL;
    }
    dispatch(UploadPost(newPost));
    toast.success("New post uploaded!", {
      position: "top-right",
      style: {
        background: "#d4edda",
      },
    });
    reset();
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />

      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            disabled={uploading}
            className="button ps-button"
            onClick={handleSubmit}
          >
            {uploading ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              placeholder="What's happening"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="previewImg"
            />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};
export default PostShare;
