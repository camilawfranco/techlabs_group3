import React from "react";
import styled from "styled-components";
import EventTile from "./EventTile";

const EventOverview = () => {
  const eventList = JSON.parse(localStorage.getItem("events")) || [];
  return (
    <EventOverviewContainer>
      {eventList.map((event, index) => {
        return <EventTile key={index} event={event} />;
      })}
    </EventOverviewContainer>
  );
};

export default EventOverview;

const EventOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
