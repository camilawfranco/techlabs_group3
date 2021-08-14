import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const LoginCW = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [registered, setRegistered] = useState(true);
  const [personalData, setPersonalData] = useState({ name: "", email: "", password: "", confirmPW: "" });
  const [visibility, setVisibility] = useState(false);

  const switchMode = (event) => {
    event.preventDefault();
    setRegistered(!registered);
  };

  const handleChange = (event) => {
    setPersonalData({ ...personalData, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleShowPassword = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Window>
      <LoginWindow>
        {!registered && (
          <InputField name="name" id="name" value={personalData.name} onChange={handleChange} placeholder="Name" />
        )}
        <InputField
          type="email"
          name="email"
          id="email"
          value={personalData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <InputField
          type="password"
          name="password"
          id="password"
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
      </LoginWindow>
    </Window>
  );
};

export default LoginCW;

const Window = styled.div`
  height: 100%;
  width: 100%;
  background: red;
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
`;

const InputField = styled.input``;

const VisibilityButton = styled.div``;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  background: blue;
  gap: 12px;
`;

const Button = styled.button`
  width: 100%;
`;
