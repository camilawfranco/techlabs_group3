import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../Firebase/firebaseConfig";

const Sidebar = () => {
  const history = useHistory();
  const user = useContext(AuthContext);

  const testLogout = () => {
    auth.signOut();
    history.push("/");
  };

  console.log("user", user);
  return (
    <SidebarContainer>
      <Logo src={require("../Logo_Aloha.svg").default} alt="Logo" />
      {user ? (
        <>
          <Avatar onClick={() => history.push("/profile")}>
            {user?.displayName?.charAt(0)}
            {user?.displayName?.charAt(1).toUpperCase()}
          </Avatar>
          <Navigation to="/newEvent">New Event</Navigation>
          <Navigation to="/profile">Profile</Navigation>
          <Navigation to="/overview">Overview</Navigation>
          <Navigation to="/calender">Calender</Navigation>
          <Navigation to="/" onClick={testLogout}>
            Logout
          </Navigation>
        </>
      ) : (
        <Navigation to="/">Login</Navigation>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const Logo = styled.img`
  height: 150px;
`;

const SidebarContainer = styled.div`
  position: fixed;
  width: 300px;
  min-height: 620px;
  margin: 20px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 105, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  /* background-color: #89b0ae; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navigation = styled(NavLink)`
  width: 250px;
  height: 50px;
  border-radius: 10px;
  background-color: lightgray;
  margin: 5px 0;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: grey;
    color: lightgray;
    border-radius: 10px;
  }
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
