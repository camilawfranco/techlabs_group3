import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  // dummy login
  const dummyLogin = () => {
    history.push("/overview");
    const user = {
      name: "Christopher",
      email: "cw@web.de",
      id: "ChristopherTestID",
    };
    localStorage.setItem("profile", JSON.stringify(user));
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={dummyLogin}>Login: go to Overview</button>
    </div>
  );
};

export default Login;
