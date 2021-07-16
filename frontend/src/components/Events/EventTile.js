import React from "react";
import styled from "styled-components";

const EventTile = ({ event }) => {
  return (
    <EventTileContainer>
      <h1>{event.name}</h1>
      <h4>{event.participants}</h4>
      <p>{event.place}</p>
      <p>{event.time}</p>
    </EventTileContainer>
  );
};

export default EventTile;

const EventTileContainer = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  &:hover {
    background: grey;
    border-radius: 10px;
    cursor: pointer;
  }
`;
