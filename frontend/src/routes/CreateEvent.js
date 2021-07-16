import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { createEvent } from "../api";
import { useHistory } from "react-router-dom";

const InitialState = {
  name: "",
  place: "",
  time: "",
  participants: "",
  id: "TestID",
};

const CreateEvent = () => {
  const history = useHistory();
  const [eventData, setEventData] = useState(InitialState);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createEvent(eventData);
    setEventData(InitialState);
    history.push("/overview");
  };

  const handleClear = () => {
    setEventData(InitialState);
  };

  return (
    <Layout>
      <h1>New Event</h1>
      <InputForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          id="name"
          value={eventData.name}
          placeholder="Name of Event"
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="place"
          id="place"
          value={eventData.place}
          placeholder="Place of Event"
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="time"
          id="time"
          value={eventData.time}
          placeholder="Time of Event"
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="participants"
          id="participants"
          value={eventData.participants}
          placeholder="Participants"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </InputForm>
    </Layout>
  );
};

export default CreateEvent;

const InputField = styled.input``;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;
