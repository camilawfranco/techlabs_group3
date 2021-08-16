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
            <InputField input id="loginField" type="text" name="login" placeholder="Username or email" />
            </Fenster>
            <Fenster>
            <InputField input id="psdField" type="password" name="password" placeholder="Password" />
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
      border-radius: 10px, white;
      flex-direction: column;
      justify-content: center;
      background: #89b0ae;
      align-items: center;
      height: 100vh;
`

const Button = styled.button`
      text-align: center;
      height: 40px;
      width: 200px;
      background-color: white;
      border: solid, white; 
      border-radius: 10px;
      border-style: none;
      font-color: #555b6e; 
      font-size: medium;
`

const BottonBox = styled.div`
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin: 5px;
      border-radius: 10px; 
      border-color: white;
`      

const Fenster = styled.div`
      text-align: center;
      height: 40px;
      width: 410px;
      font-color: #555b6e; 
      font-size: 20px;
      border-style: solid;
      background-color: white;
      border-color: white; 
      border-radius: 10px;   
      margin: 5px; 
`

const InputField = styled.input`
      border-style: solid;
      border-color: white;
      text-align: center;
      font-color: #555b6e; 
      font-size: medium;
`
