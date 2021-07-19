const express = require("express");
const Event = require("../models/event");
const erouter = new express.Router();

erouter.post("/events", async (req, res) => {
  const todo = new Event(req.body);
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

erouter.get("/events", async (req, res) => {
  try {
    const todos = await Event.find({});
    res.send(todos);
  } catch (e) {
    res.status(500).send();
  }
});
erouter.get("/events/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const todo = await Event.findById(_id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (e) {
    res.status(500).send();
  }
});
erouter.put("/events/:id", async (req, res) => {
  try {
    console.log("id", req.params.id);
    console.log("data", req.body);
    await Event.findByIdAndUpdate(req.params.id, req.body);
    console.log("Event updated");
  } catch (error) {
    console.log("Error: Updating Event");
  }
});

erouter.delete("/events/:id", async (req, res) => {
  try {
    const todo = await Event.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = erouter;
