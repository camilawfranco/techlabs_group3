import "./App.css";
import Overview from "./routes/Overview";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import Calender from "./routes/Calender";
import Profile from "./routes/Profile";
import CreateEvent from "./routes/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Login} />
        <Route path="/overview" component={Overview} />
        <Route path="/calender" component={Calender} />
        <Route path="/newEvent" component={CreateEvent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
