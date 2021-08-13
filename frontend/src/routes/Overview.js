import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import EventOverview from "../components/Events/EventOverview";
import { UserContext } from "../App";

const Overview = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const createEvent = () => {
    history.push("/newEvent");
  };

  return (
    <>
      <h1>Upcoming events</h1>
      {user && <button onClick={createEvent}>Create a new Event</button>}
      <EventOverview />
    </>
  );
};

export default Overview;
