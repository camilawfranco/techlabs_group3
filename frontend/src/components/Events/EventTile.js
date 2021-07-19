import React, { useState } from "react";
import styled from "styled-components";
import { deleteEvent } from "../../api";
import { useHistory } from "react-router";

const EventTile = ({ event, handleShowEvent }) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const isCreator = user.id === event.creator;
  console.log(isCreator);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteEvent(id);
    history.push("/overview");
  };

  return (
    <EventTileContainer onClick={() => handleShowEvent(event._id)}>
      <h1>{event.name}</h1>
      <h4>{event.participants}</h4>
      <p>{event.place}</p>
      <p>{event.time}</p>
      {isCreator && <button onClick={(e) => handleDelete(event._id, e)}>Delete</button>}
    </EventTileContainer>
  );
};

export default EventTile;

const EventTileContainer = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  background: grey;
  border-radius: 10px;
  &:hover {
    background: lightblue;
    cursor: pointer;
  }
`;
