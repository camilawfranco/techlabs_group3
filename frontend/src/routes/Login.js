import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  // dummy login
  const dummyLogin = () => {
    history.push("/overview");
    const dummyUser = {
      name: "Christopher",
      email: "cw@web.de",
      id: "ChristopherTestID",
    };
    localStorage.setItem("profile", JSON.stringify(dummyUser));
    setUser(dummyUser);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={dummyLogin}>Login: go to Overview</button>
    </div>
  );
};

export default Login;
