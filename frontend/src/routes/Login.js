import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  return (
    /*<div>
      <h1>Login</h1>
      <button onClick={dummyLogin}>Login: go to Overview</button>
    </div>*/
         <LoginWindow>
          <form>
            <Fenster>
            <input id="loginField" type="text" name="login" placeholder="Username or email" />
            </Fenster>
            <Fenster>
            <input id="psdField" type="password" name="password" placeholder="Password" />
            </Fenster>
            <BottonBox>
              <Button id="submitBtn" type="submit" name="submit">Log in</Button>
              <Button id="registerBtn" type="submit" name="submit">Register</Button>
            </BottonBox>
          </form>
        </LoginWindow>

  );
};


export default Login;
const LoginWindow = styled.div`
      display: flex; 
      border-radius: 10px; white;
      flex-direction: column;
      justify-content: center;
      background-color: grey;
      align-items: center;
      height: 100vh;
`
const Button = styled.button`
      text-align: center;
      height: 40px;
      width: 200px;
      font-size: 20px;
      background-color: white;
      border-color: white; 
      border-radius: 10px;        
`
const BottonBox = styled.div`
      display: flex;
      flex-direction: row;
      gap: 15px;
      margin: 5px;
      border-radius: 10px; 
      border-color: white; 
`      
const Fenster = styled.div`
      text-align: center;
      height: 40px;
      width: 410px;
      font-size: 20px;
      border-style: solid;
      background-color: white;
      border-color: white; 
      margin: 5px; 
      border-radius: 10px;
`
