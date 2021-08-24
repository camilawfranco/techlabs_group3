const express = require("express");
require("./db/mongoose");
const cors = require("cors");
// import cors from "cors";

const userRouter = require("./routers/user");
const eventRouter = require("./routers/event");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(eventRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
const User = require('./models/user')
const Event = require('./models/event')
const main = async () => {
 

  const user = await User.findById('611ce2322afce715f0137c88')
  await user.populate('myevent').execPopulate()
  console.log(user.myevent)

}
main()

