const express = require("express");
require("./db/mongoose");
const cors = require("cors");
// import cors from "cors";

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const eventRouter = require("./routers/event");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(taskRouter);
app.use(eventRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
const bcrypts = require("bcryptjs");
const myFunction = async () => {
  const password = "Red1234!";
  const hashedPassword = await bcrypts.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);
  const isMatch = await bcrypts.compare("red1234!", hashedPassword);
  console.log(isMatch);
};
myFunction();
