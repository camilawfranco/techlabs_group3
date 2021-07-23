import React, { useState } from "react";
import styled from "styled-components";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [infoMessage, setInfoMessage] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPW: "",
  });

  // To do: PW check in backend => "best practice"
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!changePassword) {
      localStorage.setItem("profile", JSON.stringify(profileData));
      setInfoMessage("Successfully changed Profile Data");
    }
    if (changePassword && profileData.password === profileData.confirmPW) {
      localStorage.setItem("profile", JSON.stringify(profileData));
      setInfoMessage("Successfully changed Profile Data and Password");
    }
    if (changePassword && profileData.password !== profileData.confirmPW) {
      setInfoMessage("Passwords don´t match");
    }
  };

  const handleChange = (event) => {
    setProfileData({ ...profileData, [event.currentTarget.name]: event.currentTarget.value });
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

  return (
    <>
      <h1>Profile</h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" value={profileData.name} onChange={handleChange} />
        <input type="text" name="email" id="email" value={profileData.email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          id="password"
          value={profileData.password}
          onChange={handleChange}
          placeholder="*****"
        />
        {changePassword && (
          <input
            type="password"
            name="confirmPW"
            id="confirmPW"
            value={profileData.confirmPW}
            onChange={handleChange}
          />
        )}
        {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleAbort}>
          Abort
        </button>
      </Form>
    </>
  );
};

export default Profile;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.div``;
