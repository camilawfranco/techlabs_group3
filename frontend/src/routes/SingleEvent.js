import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { deleteEvent, getSingleEvent, updateEvent } from "../api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const SingleEvent = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nameWoLogin, setNameWoLogin] = useState("");
  const [copied, setCopied] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    place: "",
    time: "",
    participants: "",
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
    const updatedParticipants = [...eventData.participants];
    // const newParticipant = "";
    if (user) {
      updatedParticipants.push(user?.name);
    } else {
      if (nameWoLogin !== "") {
        updatedParticipants.push(nameWoLogin);
      }
    }

    // newData => setState is not quick enough; updateEvent would run with old state
    const newData = { ...eventData, participants: updatedParticipants };
    setEventData({ ...eventData, participants: updatedParticipants });
    updateEvent(eventId, newData);
    history.push("/overview");
  };

  const handleCopyLink = () => {
    const URL = window.location.href;
    console.log("URL", URL);
    const el = document.createElement("input");
    el.value = URL;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  };

  console.log("isCreator (SingleEvent)", isCreator);
  console.log("user (SingleEvent)", Boolean(user));
  return (
    <>
      <h1>Single Event</h1>
      {user && <button onClick={() => history.push("/overview")}>Back to Overview</button>}
      {!isLoading ? (
        <>
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
              </>
            )}
          </InputForm>
          <button onClick={handleJoin}>Join Meeting</button>
          {isCreator && (
            <button type="button" onClick={() => handleDelete(eventId)}>
              Delete
            </button>
          )}
          <button onClick={handleCopyLink}>{copied ? "Link copied" : "Copy Link to Event"}</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default SingleEvent;

const InputField = styled.input``;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;
