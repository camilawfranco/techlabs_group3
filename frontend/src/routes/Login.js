import React, {useState, useContext} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogin = (event) => {
      event.preventDefault();
      setUser({ name: "Christopher", email: "cw@web.de", id: "TEST_ID"});
      history.push('/overview');
  }

  return (
         <LoginWindow>
            <form>
              <InputField input id="loginField" type="text" name="login" placeholder="Username or email" />
              <InputField input id="psdField" type="password" name="password" placeholder="Password" /> 
              <ButtonBox>
              <Button id="submitBtn" type="submit" name="submit" onClick={handleLogin}>Log in</Button>
              <Button id="registerBtn" type="submit" name="submit">Register</Button>
              </ButtonBox>
            </form>
        </LoginWindow>
  );
};

export default Login;
const LoginWindow = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      background: #89b0ae;
      height: 100vh;
             
`
const InputField = styled.input`
      display: flex;
      justify-content: center;
      align-items: center;
      border-style: solid;
      border-color: white;
      border-radius: 10px;
      text-align: center;
      font-color: #555b6e; 
      font-size: medium;
      outline: none;
      height: 40px;
      width: 510px;
`

const ButtonBox = styled.div`
      display: flex;
      flex-direction: row;
      gap: 5px;
      margin: 5px;
      border-radius: 10px; 
      border-color: white; 
`   

const Button = styled.button`
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 40px;
      width: 180px;
      background-color: white;
      border: solid, white; 
      border-radius: 10px;
      border-style: none;
      font-color: #555b6e; 
      font-size: medium;
`

   
