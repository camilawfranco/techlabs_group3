import "./App.css";
import Overview from "./routes/Overview";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import Calender from "./routes/Calender";
import Profile from "./routes/Profile";
import CreateEvent from "./routes/CreateEvent";
import SingleEvent from "./routes/SingleEvent";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Login} />
        <Route path="/overview" component={Overview} />
        <Route path="/calender" component={Calender} />
        <Route path="/newEvent" component={CreateEvent} />
        <Route path="/event/:id" component={SingleEvent} />
        {/* <Route path="/event/60eeb44ef258f53dccd97fcf" component={SingleEvent} />
        <Route path="/event/60f147a20a9f0e459450d405" component={SingleEvent} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
