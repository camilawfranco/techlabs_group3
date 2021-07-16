import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { createEvent } from "../api";
import { useHistory } from "react-router-dom";
import { getEvents } from "../api";

const SingleEvent = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({
    name: "",
    place: "",
    time: "",
    participants: "",
    id: "TestID",
  });
  const id = window.location.href.split("/").pop();

  useEffect(() => {
    getEvents().then((response) => {
      const eventData = response.data.map((event) => {
        if (event._id === id) {
          setEventData(event);
        }
      });
    });
  }, []);
  console.log(eventData);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createEvent(eventData);
    history.push("/overview");
  };

  const handleDelete = () => {
    // Todo: Write delete function
  };

  return (
    <Layout>
      <h1>Single Event</h1>
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
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </InputForm>
    </Layout>
  );
};

export default SingleEvent;

const InputField = styled.input``;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;
