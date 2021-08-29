import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import Overview from "./routes/Overview";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import CalendarView from "./routes/Calendar";
import Profile from "./routes/Profile";
import CreateEvent from "./routes/CreateEvent";
import SingleEvent from "./routes/SingleEvent";
import Layout from "./components/Layout";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const user = useContext(AuthContext);

  console.log("ENV", process.env.REACT_APP_API_KEY);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/" component={LoginCW} /> */}
          <Route path="/event/:id" component={SingleEvent} />
          {user && (
            <>
              <Route path="/profile" component={Profile} />
              <Route path="/overview" component={Overview} />
              <Route path="/calender" component={CalendarView} />
              <Route path="/newEvent" component={CreateEvent} />
              {/* commented out, because you should be able to reach the event without having an account */}
              {/* <Route path="/event/:id" component={SingleEvent} /> */}
            </>
          )}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
