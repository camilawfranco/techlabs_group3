import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import { getEvents, deleteEvent } from "../../api";
import { useHistory } from "react-router-dom";

const EventOverview = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEventData = () => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
  };

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
    setIsLoading(false);
  }, [window.location.href]);

  const handleShowEvent = async (id) => {
    console.log("id: ", id);
    history.push(`/event/${id}`);
  };

  const handleDelete = async (event, id) => {
    console.log("id to delete", id);
    event.stopPropagation();
    deleteEvent(id).then(getEventData());
  };

  console.log("events", events);

  return (
    <EventOverviewContainer>
      {!isLoading ? (
        events.map((event, index) => {
          return <EventTile key={event._id} event={event} handleShowEvent={handleShowEvent} setEvents={setEvents} />;
        })
      ) : (
        <p>loading..</p>
      )}
    </EventOverviewContainer>
  );
};

export default EventOverview;

const EventOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
