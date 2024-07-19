import { useState } from "react";
import "./InfoCard.css";

import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h3>Your Info</h3>
        <UilPen onClick={() => setModalOpened(true)} />
        <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>

      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>In Relationship</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>Multan</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>Google</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
