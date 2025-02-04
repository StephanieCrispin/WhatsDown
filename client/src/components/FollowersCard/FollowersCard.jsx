import { useEffect, useState } from "react";
import { Followers } from "../../Data/FollowersData";
import User from "../User/User";
import "./FollowersCard.css";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

const FollowersCard = () => {
  // const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data.data);
      console.log(data);
    };
    fetchPersons();
  }, []);

  const getRandomPeople = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomPersons = getRandomPeople(persons, 4);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {randomPersons?.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
    </div>
  );
};

export default FollowersCard;
