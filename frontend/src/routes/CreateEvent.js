import React, { useState, useContext } from "react";
import styled from "styled-components";
import { createEvent } from "../api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const CreateEvent = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const InitialState = {
    creator: user.id,
    name: "",
    place: "",
    time: "",
    participants: "",
  };

  const [eventData, setEventData] = useState(InitialState);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const participantsList = eventData.participants.split(", ");
    const uploadData = { ...eventData, participants: participantsList };
    console.log(uploadData);
    let ID = "";
    await createEvent(uploadData).then((response) => {
      ID = response.data._id;
      copy(ID);
    });
    setEventData(InitialState);
    history.push(`/event/${ID}`);
  };

  const copy = (ID) => {
    const el = document.createElement("input");
    el.value = `http://localhost:3000/event/${ID}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleClear = () => {
    setEventData(InitialState);
  };

  return (
    <>
      <Title> New Event</Title>
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
        <StyledButton type="submit">Submit (&Copy Link)</StyledButton>
        <StyledButton type="button" onClick={handleClear}>
          Clear
        </StyledButton>
      </InputForm>
    </>
  );
};

export default CreateEvent;

const InputField = styled.input`
  padding: 10px 10px;
  border-radius: 50%;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  background-color: lightgray;
  margin: 5px 0;
  text-decoration: none;
  display: flex;
  justify-content: center;
  border: none;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 100px;
`;

//New styled components element to edit the look of the form buttons
const StyledButton = styled.button`
  background-color: blue;
  margin: 100px 0;
`;

//New styled component to edit the H1
const Title = styled.h1`
  color: black;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
