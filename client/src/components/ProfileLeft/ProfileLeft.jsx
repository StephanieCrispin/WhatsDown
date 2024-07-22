import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InforCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
