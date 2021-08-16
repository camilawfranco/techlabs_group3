import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { createUser, getUser } from "../api";

const LoginCW = () => {
  const { user, setUser } = useContext(UserContext);
  const [registered, setRegistered] = useState(true);
  const [personalData, setPersonalData] = useState({ name: "", email: "", password: "", confirmPW: "" });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (registered) {
      console.log("login");
      // test with selfselected ID
      const id = "6117c3b48b26e4339092e7b4";
      getUser(id).then((response) => {
        console.log("response.data", response.data);
        setUser(response.data);
      });
    } else if (!registered) {
      if (personalData.confirmPW === personalData.password) {
        console.log("register user");
        createUser(personalData);
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
            name="name"
            id="name"
            required
            value={personalData.name}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  width: 50%;
  padding: 12px;
  background: grey;
  border-radius: 10px;
`;

const InputField = styled.input``;

const VisibilityButton = styled.div`
  position: relative;
  right: 24px;
  align-self: center;
  z-index: 1;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  gap: 12px;
`;

const Button = styled.button`
  width: 100%;
`;

const InfoText = styled.p`
  text-align: center;
`;
