import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ContentContainer>
        <h1>Content</h1>
        {children}
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const SidebarContainer = styled.div``;

const ContentContainer = styled.div``;
