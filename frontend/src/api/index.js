import axios from "axios";

const url = "http://localhost:5000/events";

export const getEvents = async () => await axios.get(url);
export const getSingleEvent = async (id) => await axios.get(`${url}/${id}`);
export const createEvent = (newEvent) => axios.post(url, newEvent);
export const deleteEvent = async (id) => await axios.delete(`${url}/${id}`);
export const updateEvent = async (id, data) => await axios.put(`${url}/${id}`, data);
