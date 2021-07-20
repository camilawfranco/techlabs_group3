import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { deleteEvent, getSingleEvent, updateEvent } from "../api";
import { useHistory } from "react-router-dom";

const SingleEvent = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nameWoLogin, setNameWoLogin] = useState("");
  const [eventData, setEventData] = useState({
    name: "",
    place: "",
    time: "",
    participants: "",
    id: "TestID",
  });
  const eventId = window.location.href.split("/").pop();

  useEffect(() => {
    getSingleEvent(eventId).then((response) => {
      setEventData(response.data);
      setIsLoading(false);
      if (response.data.creator === user?.id) {
        setIsCreator(true);
      }
    });
  }, []);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleNameWoLogin = (event) => {
    setNameWoLogin(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateEvent(eventId, eventData);
    history.push("/overview");
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    history.push("/overview");
  };

  const handleJoin = (event) => {
    event.preventDefault();
    if (nameWoLogin !== "") {
      const updatedParticipants = [...eventData.participants];
      updatedParticipants.push(nameWoLogin);
      // newData => setState is not quick enough; updateEvent would run with old state
      const newData = { ...eventData, participants: updatedParticipants };
      setEventData({ ...eventData, participants: updatedParticipants });
      updateEvent(eventId, newData);
      history.push("/overview");
    }
  };

  console.log("isCreator", isCreator);
  return (
    <Layout>
      <h1>Single Event</h1>
      {user && <button onClick={() => history.push("/overview")}>Back to Overview</button>}
      {!isLoading ? (
        <InputForm onSubmit={handleSubmit}>
          <InputField
            disabled={!isCreator}
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
            disabled={!isCreator}
            name="place"
            id="place"
            value={eventData.place}
            placeholder="Place of Event"
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            disabled={!isCreator}
            name="time"
            id="time"
            value={eventData.time}
            placeholder="Time of Event"
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            disabled={!isCreator}
            name="participants"
            id="participants"
            value={eventData.participants}
            placeholder="Participants"
            onChange={handleChange}
            required
          />
          {!user && (
            <InputField
              type="text"
              name="name"
              id="id"
              value={nameWoLogin}
              placeholder="Enter Name to join Event"
              onChange={handleNameWoLogin}
            />
          )}
          {isCreator && (
            <>
              <button type="submit">Save changes</button>
              <button type="button" onClick={() => handleDelete(eventId)}>
                Delete
              </button>
            </>
          )}
          <button onClick={handleJoin}>Join Meeting</button>
        </InputForm>
      ) : (
        <h1>Loading...</h1>
      )}
    </Layout>
  );
};

export default SingleEvent;

const InputField = styled.input``;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;
