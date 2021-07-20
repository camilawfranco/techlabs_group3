import React from "react";
import { useHistory } from "react-router-dom";
import EventOverview from "../components/Events/EventOverview";
import Layout from "../components/Layout";

const Overview = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const createEvent = () => {
    history.push("/newEvent");
  };

  return (
    <Layout>
      <h1>Upcoming events</h1>
      {user && <button onClick={createEvent}>Create a new Event</button>}
      <EventOverview />
    </Layout>
  );
};

export default Overview;
