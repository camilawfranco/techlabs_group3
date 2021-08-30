import React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Burger from "./burger/Burger";
import styled from "styled-components";
import background from "../images/background.svg";

const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Burger open={openMenu} setOpen={setOpenMenu} />
      <LayoutContainer>
        {openMenu && (
          <SidebarContainer>
            <Sidebar open={openMenu} setOpen={setOpenMenu} />
          </SidebarContainer>
        )}
        <ContentContainer open={openMenu}>{children}</ContentContainer>
      </LayoutContainer>
    </>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 150%;
  background-image: url(${background});

  background-size: cover;
  background-repeat: repeat-y;  
  background-attachment: scroll;
  position: absolute;
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr 4fr; */

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const SidebarContainer = styled.div`
  /* height: 100vh; */
  z-index: 1;
`;

const ContentContainer = styled.div`
  margin-left: ${(props) => (props.open ? "330px" : "10px")};

  @media screen and (max-width: 1000px) {
    margin-top: ${(props) => (props.open ? "640px" : "10px")};
    margin-left: 0px;
  }
`;
