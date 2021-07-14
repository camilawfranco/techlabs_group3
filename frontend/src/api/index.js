import axios from "axios";

const url = "http://localhost:5000/events";

export const getEvents = () => axios.get(url);
export const createEvent = (newEvent) => axios.post(url, newEvent);
