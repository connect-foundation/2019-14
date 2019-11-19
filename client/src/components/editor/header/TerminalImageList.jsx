import React from "react";
import styled from "styled-components";
import TerminalImage from "./TerminalImage";
// TODO 임시로 저장한 기본 아이콘 삭제할 것
import ubuntuImagePath from "../../../../public/ubuntu-50.png";
import mysqlImagePath from "../../../../public/mysql-logo-50.png";
import nodejsImagePath from "../../../../public/nodejs-50.png";
import npmImagePath from "../../../../public/npm-50.png";

const TerminalImageList = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TerminalImageContainer = () => {
  const defaultData = [
    ubuntuImagePath,
    mysqlImagePath,
    nodejsImagePath,
    npmImagePath,
  ];
  const makeImageList = () => {
    return defaultData.map(image => {
      return TerminalImage(image);
    });
  };
  return (
    <TerminalImageList>
      {makeImageList()}
    </TerminalImageList>
  );
};

export default TerminalImageContainer;
