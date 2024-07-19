import "./InfoCard.css";

import { UilPen } from "@iconscout/react-unicons";

const InfoCard = () => {
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h3>Your Info</h3>
        <UilPen />
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
