import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { createUser, getUser } from "../api";
import { useHistory } from "react-router";
import { auth } from "../Firebase/firebaseConfig";
import { AuthContext } from "../Context/AuthContext";

const LoginCW = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const [registered, setRegistered] = useState(true);
  const [personalData, setPersonalData] = useState({ displayName: "", email: "", password: "", confirmPW: "", id: "" });
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");

  const switchMode = (event) => {
    event.preventDefault();
    setRegistered(!registered);
  };

  const handleChange = (event) => {
    setPersonalData({ ...personalData, [event.currentTarget.name]: event.currentTarget.value });
    setMessage("");
  };

  const handleShowPassword = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (registered) {
      // Login
      try {
        await auth.signInWithEmailAndPassword(personalData.email, personalData.password);
        history.push("/overview");
      } catch (error) {
        setMessage("Wrong Credentials or non-existent User!");
        console.error(error);
      }
    } else if (!registered) {
      // Register a new User
      if (personalData.confirmPW === personalData.password) {
        try {
          await auth.createUserWithEmailAndPassword(personalData.email, personalData.password);
          await auth.currentUser.updateProfile({ displayName: personalData.displayName });
          history.push("/overview");
        } catch (error) {
          setMessage("Email is already in use!");
          console.error(error);
        }
      } else {
        console.log("PW don´t match");
        setMessage("Passwords don´t match");
      }
    }
  };

  console.log(user);

  return (
    <Window>
      <LoginWindow onSubmit={handleSubmit}>
        {!registered && (
          <InputField
            type="text"
            autoFocus
            name="displayName"
            id="displayName"
            required
            value={personalData.displayName}
            onChange={handleChange}
            placeholder="Name"
          />
        )}
        <InputField
          type="email"
          name="email"
          id="email"
          required
          value={personalData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <InputField
          type="password"
          name="password"
          id="password"
          required
          minLength="7"
          value={personalData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {!registered && (
          <>
            <InputField
              type={visibility ? "text" : "password"}
              name="confirmPW"
              id="confirmPW"
              required
              minLength="7"
              value={personalData.confirmPW}
              onChange={handleChange}
              placeholder="ConfirmPassword"
            />
            <VisibilityButton onClick={handleShowPassword}>
              {visibility ? <MdVisibility /> : <MdVisibilityOff />}
            </VisibilityButton>
          </>
        )}
        <ButtonBox>
          <Button type="button" onClick={switchMode}>
            {registered ? "Create an Account" : "Go to login"}
          </Button>
          <Button type="submit">{registered ? "Login" : "Register"}</Button>
        </ButtonBox>
        {message !== "" && <InfoText>{message}</InfoText>}
      </LoginWindow>
    </Window>
  );
};

export default LoginCW;

const Window = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LoginWindow = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
`;

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
  width: 410px;
  margin: 5px;
`;

const VisibilityButton = styled.div`
  position: relative;
  right: 24px;
  align-self: center;
  z-index: 1;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 5px;
  border-radius: 10px;
  border-color: white;
  // display: flex;
  // flex-direction: row;
  // justify-content: space-evenly;
  // width: 100%;
  // gap: 12px;
`;

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
height: 40px;
width: 205px;
background-color: white;
border: solid, white; 
border-radius: 10px;
border-style: none;
font-color: #555b6e; 
font-size: medium;
&:hover {
background: grey;
color: lightgray;
border-radius: 10px;
`;

const InfoText = styled.p`
  text-align: center;
`;
