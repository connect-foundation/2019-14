import React from "react";
import styled from "styled-components";

const MainPageHeaderWrapper = styled.div`
  text-align: center;
  img {
    max-width: 40%;
  }
`;
const MainHeader = () => {
  return (
    <MainPageHeaderWrapper>
      <img
        src="https://1.bp.blogspot.com/-hK817YhW4Qs/XfSOEn560BI/AAAAAAAAL8E/WPfry7lVPLYi9HAPg7eza2gUYy7PKmr1gCLcBGAsYHQ/s1600/BoostWriter.png"
        alt="logo"
      />
    </MainPageHeaderWrapper>
  );
};

export default MainHeader;
