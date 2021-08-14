import "./App.css";
import React, { useEffect, useState } from "react";
import Overview from "./routes/Overview";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import LoginCW from "./routes/LoginCW";
import Calender from "./routes/Calender";
import Profile from "./routes/Profile";
import CreateEvent from "./routes/CreateEvent";
import SingleEvent from "./routes/SingleEvent";
import Layout from "./components/Layout";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/test" component={LoginCW} />
            {/* <Route exact path="/" component={LoginCW} /> */}
            <Route path="/event/:id" component={SingleEvent} />
            {user && (
              <>
                <Route path="/profile" component={Profile} />
                <Route path="/overview" component={Overview} />
                <Route path="/calender" component={Calender} />
                <Route path="/newEvent" component={CreateEvent} />
                {/* commented out, because you should be able to reach the event without having an account */}
                {/* <Route path="/event/:id" component={SingleEvent} /> */}
              </>
            )}
          </Switch>
        </Layout>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
