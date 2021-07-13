import React from "react";
import { useHistory } from "react-router-dom";
import EventOverview from "../components/Events/EventOverview";
import Layout from "../components/Layout";

const Overview = () => {
  const history = useHistory();
  const createEvent = () => {
    history.push("/newEvent");
  };

  return (
    <Layout>
      <h2>Overview with upcoming events</h2>
      <EventOverview />
      <button onClick={createEvent}>Create a new Event</button>
    </Layout>
  );
};

export default Overview;
