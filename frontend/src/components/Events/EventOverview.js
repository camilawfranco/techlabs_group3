import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import { getEvents } from "../../api";
import { useHistory } from "react-router-dom";

const EventOverview = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data);
    });
    setIsLoading(false);
  }, [window.location.href, reload]);

  const handleShowEvent = async (id) => {
    console.log("id: ", id);
    history.push(`/event/${id}`);
  };

  return (
    <EventOverviewContainer>
      {!isLoading ? (
        events.map((event, index) => {
          return (
            <EventTile
              key={index}
              event={event}
              handleShowEvent={handleShowEvent}
              reload={reload}
              setReload={setReload}
            />
          );
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
