import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import { getEvents } from "../../api";

const EventOverview = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
    setIsLoading(false);
  }, []);

  const handleClick = (index) => {
    console.log("id: ", index);
  };

  return (
    <EventOverviewContainer>
      {!isLoading ? (
        events.map((event, index) => {
          return <EventTile key={index} event={event} onClick={() => handleClick(index)} />;
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
