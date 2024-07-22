import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [user?._id, dispatch]);

  // TODO: Add actual loading logic here to replace stuff below

  if (!posts) return "No Posts";
  if (params.id) posts = posts?.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {/* TODO: FIx posts appearing 4 to 4 times it should be just once and in chronological order */}
      {/* TODO: FIx problem with redux of having to log in and out before seeing posts, it should auto upsate */}
      {loading && "Fetching Posts ..."}
      {posts?.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
};

export default Posts;
