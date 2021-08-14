import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import { getEvents } from "../../api";
import { useHistory } from "react-router-dom";

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
          console.log(event._id);
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
