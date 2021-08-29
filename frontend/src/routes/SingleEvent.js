import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { deleteEvent, getSingleEvent, updateEvent } from "../api";
import { useHistory } from "react-router-dom";

// Datepicker for selecting the Dates
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthContext";

const SingleEvent = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nameWoLogin, setNameWoLogin] = useState("");
  const [copied, setCopied] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    place: "",
    participants: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const eventId = window.location.href.split("/").pop();

  useEffect(() => {
    getSingleEvent(eventId).then((response) => {
      setEventData({
        ...response.data,
        startDate: new Date(response.data.startDate),
        endDate: new Date(response.data.endDate),
      });
      setIsLoading(false);
      if (response.data.creator === user?.uid) {
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
    // history.push("/overview");
    history.goBack();
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
      updatedParticipants.push(user?.displayName);
    } else {
      if (nameWoLogin !== "") {
        updatedParticipants.push(nameWoLogin);
      }
    }

    // newData => setState is not quick enough; updateEvent would run with old state
    const newData = { ...eventData, participants: updatedParticipants };
    setEventData({ ...eventData, participants: updatedParticipants });
    updateEvent(eventId, newData);
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
  console.log("start date geändert", eventData);

  return (
    <Window>
      <h1>Single Event</h1>

      {!isLoading ? (
        <>
          <InputForm onSubmit={handleSubmit}>
            <InputField
              disabled={!isCreator}
              type="text"
              name="title"
              id="title"
              value={eventData.title}
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
              name="participants"
              id="participants"
              value={eventData.participants}
              placeholder="Participants"
              onChange={handleChange}
              required
            />
            <DateFrame>
              <DatePickerField
                disabled={!isCreator}
                showTimeSelect
                dateFormat="d/M/yy hh:mm aa"
                selected={eventData.startDate}
                selectsStart
                startDate={eventData.startDate}
                endDate={eventData.endDate}
                onChange={(date) => setEventData({ ...eventData, startDate: date }, console.log("selected date", date))}
              />
              <DatePickerField
                disabled={!isCreator}
                showTimeSelect
                dateFormat="d/M/yy hh:mm aa"
                selected={eventData.endDate}
                selectsStart
                startDate={eventData.startDate}
                endDate={eventData.endDate}
                minDate={eventData.startDate}
                onChange={(date) => setEventData({ ...eventData, endDate: date })}
              />
            </DateFrame>
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
              <ButtonBox>
                <StyledButton type="button" onClick={() => handleDelete(eventId)}>
                  Delete
                </StyledButton>
                <StyledButton type="submit">Save changes</StyledButton>
              </ButtonBox>
            )}
            <ButtonBox>
              <StyledButton type="button" onClick={handleJoin}>
                Join Meeting
              </StyledButton>
              <StyledButton type="button" onClick={handleCopyLink}>
                {copied ? "Link copied" : "Copy Link to Event"}
              </StyledButton>
            </ButtonBox>
          </InputForm>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Window>
  );
};

export default SingleEvent;

const Window = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

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
