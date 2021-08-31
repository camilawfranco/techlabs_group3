import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { deleteEvent, getSingleEvent, updateEvent, getIp } from "../api";
import { useHistory } from "react-router-dom";

// Datepicker for selecting the Dates
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Context/AuthContext";

const SingleEvent = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const [isCreator, setIsCreator] = useState(false);
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState("");
  const [ipData, setIpData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [nameWoLogin, setNameWoLogin] = useState("");
  const [copied, setCopied] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    place: "",
    participants: "",
    newParticipants: [],
    text: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const eventId = window.location.href.split("/").pop();
  // get IP of device (res.data.IPv4)
  useEffect(() => {
    const fetchIp = async () => {
      const res = await getIp();
      setIpData(res.data);
    };
    fetchIp();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      await getSingleEvent(eventId).then((response) => {
        setEventData({
          ...response.data,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
        });
        // show participants with extra list
        const participantsArray = [];
        response.data.newParticipants.map((participant) => participantsArray.push(participant.name));
        setParticipants(participantsArray.join(", "));

        setIsLoading(false);
        console.log("problems detect creator", user?.uid, response.data.creator);
        if (response.data.creator === user?.uid) {
          setIsCreator(true);
        }
      });
    };
    fetchData();
    if (user) {
      setJoined(eventData.newParticipants.some((participant) => participant.id === user?.uid));
    } else {
      setJoined(eventData.newParticipants.some((participant) => participant.id === ipData.IPv4));
    }
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
    history.goBack();
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    history.push("/overview");
  };
  const handleJoin = async (event) => {
    event.stopPropagation();
    let newParticipantsList = [];
    if (!joined) {
      if (user) {
        newParticipantsList = [...eventData.newParticipants, { name: user?.displayName, id: user?.uid }];
      } else {
        newParticipantsList = [...eventData.newParticipants, { name: nameWoLogin, id: ipData.IPv4 }];
      }
    } else {
      if (user) {
        newParticipantsList = [...eventData.newParticipants].filter((participant) => participant.id !== user?.uid);
      } else {
        newParticipantsList = [...eventData.newParticipants].filter((participant) => participant.id !== ipData.IPv4);
      }
    }
    // update participants (field) just a string
    const participantsArray = [];
    newParticipantsList.map((participant) => participantsArray.push(participant.name));
    setParticipants(participantsArray.join(", "));
    // update particpants (eventData) [{name: "", id:""}]
    const newData = { ...eventData, newParticipants: newParticipantsList };
    setEventData({ ...newData });
    setJoined(!joined);
    await updateEvent(newData._id, newData);
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

  console.log("participants", eventData.participants);

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
              disabled
              name="participants"
              id="participants"
              value={participants}
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
            <InputField
              type="text"
              disabled={!isCreator}
              name="text"
              id="text"
              value={eventData.text}
              placeholder="Info Text"
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
            {/* Name Test */}
            {/* {eventData.newParticipants.map((participant) => {
              return <p>{participant.name}</p>;
            })} */}
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
                {joined ? "Leave Meeting" : "Join Meeting"}
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
