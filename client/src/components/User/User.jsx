import { useDispatch, useSelector } from "react-redux";
import Profile from "../../img/defaultProfile.png";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { useState } from "react";
import { createChat } from "../../api/ChatRequests";
import { useNavigate } from "react-router-dom";

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  const handleChat = async () => {
    const data = {
      senderId: user._id,
      receiverId: person._id,
    };
    const result = await createChat(data);

    console.log(result);
    navigate("/chat");
  };
  return (
    <div className="follower">
      <div>
        <img
          src={person.profilePicture ? person.profilePicture : Profile}
          className="followerImage"
          alt=""
        />
        <div className="name">
          <span>{person.name}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
      <button className={"button fc-button"} onClick={handleChat}>
        Chat
      </button>
    </div>
  );
};
export default User;
