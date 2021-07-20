const mongoose = require("mongoose");
const validator = require("validator");
const Event = mongoose.model("Event", {
  creator: {
    type: String,
  },
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  time: {
    type: String,
  },
  participants: [
    {
      type: String,
    },
  ],
  // participants: [
  //   {
  //     name: {
  //       type: String,
  //     },
  //     id: {
  //       type: String,
  //     },
  //   },
  // ],
});
module.exports = Event;
