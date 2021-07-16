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
erouter.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
erouter.patch("/events/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["compl", "desc", "task"];
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    const todo = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});
erouter.delete("/events/:id", async (req, res) => {
  console.log("test1");
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
