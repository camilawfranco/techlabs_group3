import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

const Sidebar = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const testLogout = () => {
    // todo: logout
    localStorage.removeItem("profile");
  };

  return (
    <SidebarContainer>
      <h1>Sidebar</h1>
      <Avatar onClick={() => history.push("/profile")}>{user.name}</Avatar>
      <Navigation to="/profile">Profile</Navigation>
      <Navigation to="/overview">Overview</Navigation>
      <Navigation to="/calender">Calender</Navigation>
      <Navigation to="/" onClick={testLogout}>
        Logout
      </Navigation>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navigation = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  &:hover {
    background: grey;
    border-radius: 10px;
  }
`;

const Avatar = styled.div`
  background: grey;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
