import "./App.css";
import Overview from "./routes/Overview";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import Calender from "./routes/Calender";
import Profile from "./routes/Profile";
import CreateEvent from "./routes/CreateEvent";
import SingleEvent from "./routes/SingleEvent";
import Layout from "./components/Layout";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/event/wo/:id" component={SingleEvent} />
          <Route path="/profile" component={Profile} />
          <Route path="/overview" component={Overview} />
          <Route path="/calender" component={Calender} />
          <Route path="/newEvent" component={CreateEvent} />
          <Route path="/event/:id" component={SingleEvent} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
