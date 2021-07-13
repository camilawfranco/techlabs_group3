import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    setUserLogin(true);
  }, [userLogin]);
  console.log("user", userLogin);

  // dummy login
  const dummyLogin = () => {
    history.push("/overview");
    setUserLogin(true);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={dummyLogin}>Login: go to Overview</button>
    </div>
  );
};

export default Login;
