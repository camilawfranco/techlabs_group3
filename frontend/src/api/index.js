import axios from "axios";

const url = "http://localhost:5000/events";

export const getEvents = async () => await axios.get(url);
export const createEvent = (newEvent) => axios.post(url, newEvent);
export const deleteEvent = async (id) => await axios.delete(url, id);
