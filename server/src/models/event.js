const mongoose = require("mongoose");
const validator = require("validator");
const Event = mongoose.model("Event", {
  creator: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },

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
