import React from "react";
import styled from "styled-components";
import MainHeader from "../components/main/header";
import Login from "../components/main/Login";
import Usage from "../components/main/Usage";

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.75);
  align-items: center;
  h2 {
    color: antiquewhite;
  }
  h3 {
    color: burlywood;
  }
  .sub-title {
    color: darkkhaki;
  }
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
