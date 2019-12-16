import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  margin: 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const Header = () => {
  return <HeaderWrapper>터미널 환경설정</HeaderWrapper>;
};

export default Header;
