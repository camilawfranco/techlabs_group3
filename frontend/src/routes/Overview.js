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
      <ContentWrapper>
        <Header>
          <h1>Upcoming events</h1>
          {user && <Button onClick={createEvent}>Create new Event</Button>}
        </Header>

        <EventOverview />
      </ContentWrapper>
    </>
  );
};

export default Overview;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  /* margin-left: 70px; */
`;

const Button = styled.button`
  height: 27px;

  /* margin-right: 102px; */

  border: none;
  background: #faf9f9;
  border-radius: 4px;

  font-weight: bold;

  &:hover {
    background: rgba(182, 188, 208, 0.9);
    cursor: pointer;
  }
`;
