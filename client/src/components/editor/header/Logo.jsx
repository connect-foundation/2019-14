import React from "react";
import styled from "styled-components";
import logoImagePath from "../../../../public/BoostWriter.png";

const HeaderLogoImageWrapper = styled.img`
  width: 150px;
  height: 70px;
  filter: invert(1);
`;

const HeaderLogoImage = () => {
  return <HeaderLogoImageWrapper alt="logo" src={logoImagePath} />;
};

export default HeaderLogoImage;
