import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImagePath from "../../../../public/BoostWriter.png";

const HeaderLogoImageWrapper = styled.img`
  width: 150px;
  height: 70px;
  filter: invert(1);
`;

const HeaderLogoImage = () => {
  return (
    <Link to="/">
      <HeaderLogoImageWrapper alt="logo" src={logoImagePath} />
    </Link>
  );
};

export default HeaderLogoImage;
