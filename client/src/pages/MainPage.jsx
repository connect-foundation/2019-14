import React from "react";
import styled from "styled-components";
import MainHeader from "../components/main/header";
import Login from "../components/main/login";
import Usage from "../components/main/Usage";

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.75);
  height: -webkit-fill-available;
`;
const MainPage = () => {
  return (
    <MainPageWrapper>
      <MainHeader />
      <Login />
      <Usage />
    </MainPageWrapper>
  );
};

export default MainPage;
