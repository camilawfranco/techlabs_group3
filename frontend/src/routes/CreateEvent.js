import React, { useState, useContext } from "react";
import styled from "styled-components";
import { createEvent } from "../api";
import { useHistory } from "react-router-dom";

// Datepicker for selecting the Dates
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthContext";

const CreateEvent = () => {
  const user = useContext(AuthContext);
  const history = useHistory();
  const InitialState = {
    creator: user.uid,
    title: "",
    place: "",
    startDate: new Date(),
    endDate: new Date(),
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
          name="title"
          id="title"
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
          name="participants"
          id="participants"
          value={eventData.participants}
          placeholder="Participants"
          onChange={handleChange}
          required
        />
        <DateFrame>
          <DatePickerField
            showTimeSelect
            dateFormat="d/M/yy hh:mm aa"
            selected={eventData.startDate}
            selectsStart
            startDate={eventData.startDate}
            endDate={eventData.endDate}
            onChange={(date) => setEventData({ ...eventData, startDate: date }, console.log("selected date", date))}
            required
          />
          <DatePickerField
            showTimeSelect
            dateFormat="d/M/yy hh:mm aa"
            selected={eventData.endDate}
            selectsStart
            startDate={eventData.startDate}
            endDate={eventData.endDate}
            minDate={eventData.startDate}
            onChange={(date) => setEventData({ ...eventData, endDate: date })}
            required
          />
        </DateFrame>
        <ButtonBox>
          <StyledButton type="submit">Submit (&Copy Link)</StyledButton>
          <StyledButton type="button" onClick={handleClear}>
            Clear
          </StyledButton>
        </ButtonBox>
      </InputForm>
    </>
  );
};

export default CreateEvent;

const InputField = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: #f0f0f0;
  border-radius: 10px;
  text-align: center;
  font-color: #555b6e;
  font-size: medium;
  outline: none;
  height: 40px;
  width: 410px;
  margin: 5px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 100px;
`;

//New styled components element to edit the look of the form buttons
const StyledButton = styled.button`
  color: black;
  height: 30px;
  width: 190px;
  margin: 5px;
  border-radius: 10px;
  border-style: solid;
  border-color: #f0f0f0;
  &:hover {
    background: grey;
    color: lightgray;
    border-radius: 10px;
    border-color: grey;
  }
`;

//New styled component to edit the H1
const Title = styled.h1`
  color: black;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 100px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const DateFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const DatePickerField = styled(DatePicker)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: #f0f0f0;
  border-radius: 10px;
  text-align: center;
  font-color: #555b6e;
  font-size: medium;
  outline: none;
  height: 40px;
  width: 410px;
  margin: 5px;
`;
