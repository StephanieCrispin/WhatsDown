import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/defaultProfile.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  return (
    <div className="ProfileCard">
      <div
        className={
          location === "profilePage"
            ? "ProfileImages profileExtra"
            : "ProfileImages"
        }
      >
        <img
          src={user?.coverPicture ? user?.coverPicture : Cover}
          className="CoveriImg"
          alt=""
        />
        <img
          src={user?.profilePicture ? user?.profilePicture : Profile}
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {user?.firstname} {user?.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
