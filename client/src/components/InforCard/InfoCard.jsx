import { useEffect, useState } from "react";
import "./InfoCard.css";

import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState();

  const { user } = useSelector((state) => state.authReducer.authData);

  const fetchProfileUser = async () => {
    if (profileUserId === user._id) {
      setProfileUser(user);
      console.log(user);
    } else {
      const profileUser = await UserApi.getUser(profileUserId);
      setProfileUser(profileUser);
      console.log(profileUser);
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [user, profileUserId]);

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h3>Profile Info</h3>
        {user?._id === profileUserId ? (
          <div>
            <UilPen onClick={() => setModalOpened(true)} />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser?.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Username </b>
        </span>
        <span>{profileUser?.username}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser?.livesIn} </span>
      </div>
      <div className="info">
        <span>
          <b>Country </b>
        </span>
        <span>{profileUser?.country} </span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser?.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
