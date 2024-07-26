import { useDispatch, useSelector } from "react-redux";
import Profile from "../../img/defaultProfile.png";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { useState } from "react";
import { createChat } from "../../api/ChatRequests";
import { useNavigate } from "react-router-dom";
import { Popover, ArrowContainer } from "react-tiny-popover";
import toast, { Toaster } from "react-hot-toast";

const User = ({ person }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
    toast.success(
      `Success! you hav ${following ? "unfollowed" : "followed"} ${
        person.username
      }.`,
      {
        position: "top-right",
        style: {
          background: "#d4edda",
        },
      }
    );
    window.location.reload();
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
      <Popover
        isOpen={isPopoverOpen}
        positions={["right"]}
        background="white"
        align="start"
        padding={8}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={"#2a2e2d"}
            arrowSize={8}
          >
            <div>
              <div
                className="popover-content"
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <button className={"UnfollowButton"} onClick={handleChat}>
                  Chat{" "}
                </button>
              </div>
            </div>
          </ArrowContainer>
        )}
      >
        <div
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={person.profilePicture ? person.profilePicture : Profile}
            className="followerImage"
            alt=""
          />
          <div className="name">
            <span style={{ fontWeight: "300" }}>
              {person.firstname} {person.lastname}
            </span>
            <span>@{person.username}</span>
          </div>
        </div>
      </Popover>

      <button className={"UnfollowButton"} onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
      <Toaster />
    </div>
  );
};
export default User;
