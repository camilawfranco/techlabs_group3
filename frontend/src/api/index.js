import axios from "axios";

const url = "http://localhost:5000";
const urlEvents = `${url}/events`;
const urlUsers = `${url}/users`;

export const getEvents = async () => await axios.get(urlEvents);
export const getSingleEvent = async (id) => await axios.get(`${urlEvents}/${id}`);
export const createEvent = async (newEvent) => await axios.post(urlEvents, newEvent);
export const deleteEvent = async (id) => await axios.delete(`${urlEvents}/${id}`);
export const updateEvent = async (id, data) => await axios.put(`${urlEvents}/${id}`, data);

// is working, eventhough there are erros in front- and backend :D
export const createUser = (user) => axios.post(urlUsers, user);
export const deleteUser = async (id) => await axios.delete(`${urlUsers}/${id}`);

// don´t know if working yet
export const getUser = async (id) => await axios.get(`${urlUsers}/${id}`);
export const updateUser = async (id, userData) => await axios.put(`${urlUsers}/${id}`, userData);
