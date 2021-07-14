import axios from "axios";

const url = "http://localhost:5000/tasks";

export const getEvent = () => axios.get(url);
export const createEvent = (newEvent) => axios.post(url, newEvent);
