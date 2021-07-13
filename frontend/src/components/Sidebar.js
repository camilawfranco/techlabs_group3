import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h1>Sidebar</h1>
      <Navigation to="/profile">Profile</Navigation>
      <Navigation to="/overview">Overview</Navigation>
      <Navigation to="/calender">Calender</Navigation>
      <Navigation to="/">Logout (no global state yet) </Navigation>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
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
