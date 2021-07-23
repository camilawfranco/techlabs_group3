import React, { useState } from "react";
import styled from "styled-components";
import { deleteEvent, updateEvent } from "../../api";
import { useHistory } from "react-router";

const EventTile = ({ event, handleShowEvent }) => {
  const history = useHistory();
  const [eventData, setEventData] = useState({ ...event });
  const user = JSON.parse(localStorage.getItem("profile"));
  const isCreator = user?.id === event.creator;

  const handleDelete = (id, event) => {
    event.stopPropagation();
    deleteEvent(id);
    history.push("/overview");
  };

  const handleJoin = (event) => {
    event.stopPropagation();
    const newParticipantsList = [...eventData.participants, user?.name];
    const newData = { ...eventData, participants: newParticipantsList };
    setEventData({ ...newData });
    updateEvent(newData._id, newData);
  };

  return (
    <EventTileContainer onClick={() => handleShowEvent(eventData._id)}>
      <h1>Name: {eventData.name}</h1>
      <h4>
        Participants:{" "}
        {eventData.participants.map((participant, index) => {
          if (index === eventData.participants.length - 1) {
            return participant;
          } else {
            return `${participant}, `;
          }
        })}
      </h4>
      <p>Place: {eventData.place}</p>
      <p>Time: {eventData.time}</p>
      {isCreator && <button onClick={(e) => handleDelete(eventData._id, event)}>Delete</button>}
      {user && <button onClick={handleJoin}>Join Meeting</button>}
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
