import React from "react";
import styled from "styled-components";
import { deleteEvent } from "../../api";
import { useHistory } from "react-router";

const EventTile = ({ event, handleShowEvent }) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const isCreator = user?.id === event.creator;

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteEvent(id);
    history.push("/overview");
  };

  return (
    <EventTileContainer onClick={() => handleShowEvent(event._id)}>
      <h1>Name: {event.name}</h1>
      <h4>Participants: {event.participants.map((participant) => `${participant}, `)}</h4>
      <p>Place: {event.place}</p>
      <p>Time: {event.time}</p>
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
