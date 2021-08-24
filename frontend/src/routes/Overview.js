import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import EventOverview from "../components/Events/EventOverview";
import { UserContext } from "../App";
import styled from "styled-components";

const Overview = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const createEvent = () => {
    history.push("/newEvent");
  };

  return (
    <>
      <h1>Upcoming events</h1>
      {user && <Button onClick={createEvent}>Create new </Button>}
      <EventOverview />
    </>
  );
};

export default Overview;

const Button = styled.button`
  width: 112px;
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
