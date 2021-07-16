import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import { deleteEvent, getEvents } from "../../api";
import { useHistory } from "react-router-dom";

// Todo:
// 1) Delete Post
// 2) Open Tab with Data and be able to change it

const EventOverview = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
    setIsLoading(false);
  }, []);

  const handleShowEvent = async (id) => {
    console.log("id: ", id);
    history.push(`/event/${id}`);
  };

  return (
    <EventOverviewContainer>
      {!isLoading ? (
        events.map((event, index) => {
          return <EventTile key={index} event={event} handleShowEvent={handleShowEvent} />;
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
