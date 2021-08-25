import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { deleteUser, updateUser } from "../api";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [infoMessage, setInfoMessage] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPW: "",
  });
  console.log("profileData", profileData);

  // To do: PW check in backend => "best practice"
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!changePassword) {
      localStorage.setItem("profile", JSON.stringify(profileData));
      setInfoMessage("Successfully changed Profile Data");
      //test id
      const id = "6117bd002eff41223c5d1e5d";
      updateUser(id, profileData);
    }
    if (changePassword && profileData.password === profileData.confirmPW) {
      localStorage.setItem("profile", JSON.stringify(profileData));
      setInfoMessage("Successfully changed Profile Data and Password");
      const id = "6117bd002eff41223c5d1e5d";
      updateUser(id, profileData);
    }
    if (changePassword && profileData.password !== profileData.confirmPW) {
      setInfoMessage("Passwords don´t match");
    }
  };

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log(event.currentTarget.name, event.currentTarget.value);
    if (event.currentTarget.name === "password" && event.currentTarget.value !== "") {
      setChangePassword(true);
    }
    if (event.currentTarget.name === "password" && event.currentTarget.value === "") {
      setChangePassword(false);
    }
    setInfoMessage("");
  };

  const handleAbort = () => {
    setProfileData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPW: "",
    });
    setChangePassword(false);
    setInfoMessage("");
  };

  const handleDeleteAccount = () => {
    console.log("Userid (still dummy)", user.id);
    // currently the login isn´t working, but you can still create a user, delete and update it
    const id = "6117bd002eff41223c5d1e5d";
    deleteUser(id);
    setUser(null);
    history.push("/");
  };

  return (
    <>
      <h1>Profile</h1>
      <Form onSubmit={handleSubmit}>
        <TextField type="text" name="name" id="name" value={profileData.name} onChange={handleChange} />
        <TextField type="text" name="email" id="email" value={profileData.email} onChange={handleChange} />
        <TextField
          type="password"
          name="password"
          id="password"
          value={profileData.password}
          onChange={handleChange}
          placeholder="*****"
        />
        {changePassword && (
          <TextField
            type="password"
            name="confirmPW"
            id="confirmPW"
            value={profileData.confirmPW}
            placeholder="*****"
            onChange={handleChange}
          />
        )}
        {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
        <ButtonWrapper>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={handleAbort}>
            Abort
          </Button>
          <Button type="button" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </ButtonWrapper>
      </Form>
    </>
  );
};

export default Profile;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextField = styled.input`
  height: 25px;
  width: 350px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #F0F0F0;
  border-radius: 5px;
  border-style: solid;
  border-color: #F0F0F0;
  color: steelblue;
  font-size: medium;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: 115px;
  height: 25px;
  border-radius: 5px;
  border-style: solid;
  border-color: #F0F0F0;
  background-color: #F0F0F0;
  margin-right: 5px;
  margin-top: 5px;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  &:hover {
    background: grey;
    color: #F0F0F0;
    border-radius: 10px;
  }
`;

const InfoBox = styled.div``;
