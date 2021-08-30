import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import EventOverview from "../components/Events/EventOverview";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthContext";

const Overview = () => {
  const history = useHistory();
  const user = useContext(AuthContext);

  const createEvent = () => {
    history.push("/newEvent");
  };

  return (
    <>
      <h1>Upcoming events</h1>
      {user && <Button onClick={createEvent}>Create new Event</Button>}
      <EventOverview />
    </>
  );
};

export default Overview;

const Button = styled.button`
  height: 27px;

  margin-right: 102px;

  border: none;
  background: #faf9f9;
  border-radius: 4px;

  font-weight: bold;

  &:hover {
    background: rgba(182, 188, 208, 0.9);
    cursor: pointer;
  }
`;
