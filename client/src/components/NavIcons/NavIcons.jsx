import React from "react";

// import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { UilEstate } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="navIcons">
      <Link to="../home">
        <UilEstate color="#348dd4" className="icons" />
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/profile/${user._id}`}
      >
        <UilSetting className="icons" />
      </Link>
      <img src={Noti} alt="" className="icons" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
