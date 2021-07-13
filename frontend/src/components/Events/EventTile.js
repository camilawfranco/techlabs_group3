import React from "react";
import styled from "styled-components";

const EventTile = ({ event }) => {
  return (
    <EventTileContainer>
      <h1>{event.name}</h1>
      <h5>{event.time}</h5>
    </EventTileContainer>
  );
};

export default EventTile;

const EventTileContainer = styled.div`
  &:hover {
    background: grey;
    border-radius: 10px;
    cursor: pointer;
  }
`;
