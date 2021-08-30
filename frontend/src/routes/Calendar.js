import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getEvents } from "../api";
import { useHistory } from "react-router";

// import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([{ start: moment().toDate(), end: moment().add(1, "days").toDate(), title: "Test event" }]);
    getEvents().then((response) =>
      setEvents(
        response.data.map((event) => ({ ...event, start: new Date(event.startDate), end: new Date(event.endDate) }))
      )
    );
  }, []);

  const handleSelectEvent = (eventData) => {
    console.log(eventData);
    history.push(`/event/${eventData._id}`);
  };

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={calendarDesign}
        onSelectEvent={(eventData) => handleSelectEvent(eventData)}
      />
    </CalendarContainer>
  );
};

export default CalendarView;

const CalendarContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// can´t use styled components here, because the Calendar is an imported function
//  at least i haven´t found a solution yet
const calendarDesign = {
  width: "auto",
  height: "90%",
  minHeight: "500px",
  borderRadius: "10px",
  backgroundColor: "white",
  padding: "1rem",
};
