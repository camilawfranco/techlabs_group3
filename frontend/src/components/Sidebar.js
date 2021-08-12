import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

const Sidebar = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const testLogout = () => {
    localStorage.removeItem("profile");
  };
  window.addEventListener("storage", () => console.log("Storage updated"));

  // Update is not yet working
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    console.log("useEffect");
  }, []);

  return (
    <SidebarContainer>
      <Logo src={require("../Logo_Aloha.svg").default} alt="Logo" />
      {/* TODO: Set true back to "user", when ready. True is set to show the sidebar for further development */}
      {true ? (
        <>
          <Avatar onClick={() => history.push("/profile")}>
            {user?.name.charAt(0)}
            {user?.name.charAt(1).toUpperCase()}
          </Avatar>
          <Navigation to="/profile">Profile</Navigation>
          <Navigation to="/overview">Overview</Navigation>
          <Navigation to="/calender">Calender</Navigation>
          <Navigation to="/overview" onClick={testLogout}>
            Logout
          </Navigation>
        </>
      ) : (
        <Navigation to="/" onClick={testLogout}>
          Login
        </Navigation>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const Logo = styled.img`
  height: 150px;
`;

const SidebarContainer = styled.div`
  width: 300px;
  height: 50%;
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
