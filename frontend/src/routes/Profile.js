import React, { useState, useContext } from "react";
import styled from "styled-components";
import { deleteUser, updateUser } from "../api";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../Firebase/firebaseConfig";

const Profile = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const [infoMessage, setInfoMessage] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user.displayName,
    email: user.email,
    password: "",
    confirmPW: "",
  });
  console.log("profileData", profileData);

  // To do: PW check in backend => "best practice"
  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth.currentUser.updateProfile({
      displayName: profileData.displayName,
    });
    await auth.currentUser.updateEmail(profileData.email);
    if (!changePassword) {
      setInfoMessage("Successfully changed Profile Data");
    }
    if (changePassword && profileData.password === profileData.confirmPW) {
      await auth.currentUser.updatePassword(profileData.password);
      localStorage.setItem("profile", JSON.stringify(profileData));
      setInfoMessage("Successfully changed Profile Data and Password");
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
    if (
      event.currentTarget.name === "password" &&
      event.currentTarget.value !== ""
    ) {
      setChangePassword(true);
    }
    if (
      event.currentTarget.name === "password" &&
      event.currentTarget.value === ""
    ) {
      setChangePassword(false);
    }
    setInfoMessage("");
  };

  const handleAbort = () => {
    setProfileData({
      name: user.displayName,
      email: user.email,
      password: "",
      confirmPW: "",
    });
    setChangePassword(false);
    setInfoMessage("");
  };

  const handleDeleteAccount = () => {
    auth.currentUser
      .delete()
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    history.push("/");
  };

  return (
    <ContentWrapper>
      <h1 style={{ align: "center" }}>Profile</h1>
      <Avatar onClick={() => history.push("/profile")}>
        {user?.displayName?.charAt(0)}
        {user?.displayName?.charAt(1).toUpperCase()}
      </Avatar>
      <Form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="displayName"
          id="displayName"
          value={profileData.displayName}
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="email"
          id="email"
          value={profileData.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="password"
          id="password"
          value={profileData.password}
          onChange={handleChange}
          placeholder="*****"
          autoComplete="new-password"
        />
        {changePassword && (
          <TextField
            type="password"
            name="confirmPW"
            id="confirmPW"
            autoComplete="new-password"
            value={profileData.confirmPW}
            placeholder="*****"
            onChange={handleChange}
          />
        )}
        {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
        <ButtonWrapper>
          <Button type="submit">Change</Button>
          <Button type="button" onClick={handleAbort}>
            Abort
          </Button>
          <Button type="button" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </ButtonWrapper>
      </Form>
    </ContentWrapper>
  );
};

export default Profile;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Avatar = styled.div`
  background: grey;
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
  border-radius: 50%;
  font-size: 50px;
  font-weight: bold;
  color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const TextField = styled.input`
  height: 25px;
  width: 350px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border-radius: 5px;
  border-style: solid;
  border-color: #f0f0f0;
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
  border-color: #f0f0f0;
  background-color: #f0f0f0;
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
    color: lightgray;
    border-radius: 10px;
    border-color: grey;
  }
`;

const InfoBox = styled.div``;
