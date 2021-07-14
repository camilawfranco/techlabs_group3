const mongoose = require("mongoose");
const validator = require("validator");
const Event = mongoose.model("Event", {
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  time: {
    type: String,
  },
  participants: {
    type: String,
  },
});
module.exports = Event;
