import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { deleteEvent, updateEvent, getEvents } from "../../api";
import { MdLocationOn, MdAccessTime, MdPeople } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import moment from "moment";

const EventTile = ({ event, handleShowEvent, setEvents }) => {
  const [eventData, setEventData] = useState({ ...event });
  const user = useContext(AuthContext);
  const [joined, setJoined] = useState(eventData.newParticipants.some((participant) => participant.id === user?.uid));
  const isCreator = user?.uid === event.creator;

  console.log("joined", joined);

  const handleJoin = async (event) => {
    event.stopPropagation();
    let newParticipantsList = [];
    if (!joined) {
      newParticipantsList = [...eventData.newParticipants, { name: user?.displayName, id: user?.uid }];
    } else {
      newParticipantsList = [...eventData.newParticipants].filter((participant) => participant.id !== user?.uid);
    }
    console.log("newParticipantsList", newParticipantsList);
    const newData = { ...eventData, newParticipants: newParticipantsList };
    setEventData({ ...newData });
    setJoined(!joined);
    await updateEvent(newData._id, newData);
  };

  const handleDelete = (event, id) => {
    console.log("id to delete", id);
    event.stopPropagation();
    deleteEvent(id).then(
      // sometimes the getEvent function is executed before the old event is deleted => Timeout (run after 100ms)
      setTimeout(() => {
        getEvents().then((response) => {
          setEvents(response.data);
        });
      }, 100)
    );
  };

  return (
    <EventTileContainer onClick={() => handleShowEvent(eventData._id)}>
      <EventTitleHeader>
        <h2>
          <span>{eventData.title}</span>
          <TimeUntil> ({moment(eventData.startDate).fromNow()})</TimeUntil>
        </h2>
      </EventTitleHeader>
      <EventTitleContent>
        <LocationAndTimeContainer>
          <h4>
            <MdLocationOn /> {eventData.place}
          </h4>
          <h4>
            <MdAccessTime />
            {moment(eventData.startDate).format(" DD/MM/YY hh:mm")}
          </h4>
        </LocationAndTimeContainer>

        <h4>
          <MdPeople />{" "}
          {eventData.newParticipants.map((participant, index) => {
            const numberParicipantsShown = 3;
            if (index < numberParicipantsShown) {
              if (index === eventData.newParticipants.length - 1) {
                return participant.name;
              } else {
                return `${participant.name}, `;
              }
            }
          })}
        </h4>

        <p>{eventData.text}</p>

        <ButtonArea>
          {isCreator && <Button onClick={(event) => handleDelete(event, eventData._id)}>DELETE</Button>}

          {user && <Button onClick={handleJoin}>{joined ? "LEAVE" : "JOIN"}</Button>}
        </ButtonArea>
      </EventTitleContent>
    </EventTileContainer>
  );
};

export default EventTile;

const EventTileContainer = styled.div`
  position: relative;
  width: 420px;
  height: 420px;
  margin: 1rem;
  padding: 0.5rem;

  display: inline-block;

  background: rgba(85, 91, 110, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 105, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:hover {
    background: rgba(182, 188, 208, 0.7);
    cursor: pointer;
  }
`;

const EventTitleHeader = styled.div`
  position: absolute;
  height: 72px;
  left: 39px;
  right: 39px;
  top: 39px;

  /* Inner padding of 5px on left and right */
  padding: 0px 10px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  background: #c4c4c4;
  border-radius: 10px;
`;

const TimeUntil = styled.span`
  font-size: 14px;
`;

const EventTitleContent = styled.div`
  position: absolute;
  left: 39px;
  right: 39px;
  bottom: 39px;
  top: 138px;

  /* Inner padding of 5px on left and right */
  padding: 0px 15px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  background: #c4c4c4;
  border-radius: 10px;
`;

const LocationAndTimeContainer = styled.div`
  height: 25px;
  display: flex;
  justify-content: space-between;
`;

const ButtonArea = styled.div`
  position: absolute;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

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
