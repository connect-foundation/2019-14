import React from "react";
import styled from "styled-components";
import TerminalImage from "./TerminalImage";
import PropTypes from 'prop-types';
// TODO 임시로 저장한 기본 아이콘 삭제할 것
import ubuntuImagePath from "../../../public/ubuntu-50.png";
import mysqlImagePath from "../../../public/mysql-logo-50.png";
import nodejsImagePath from "../../../public/nodejs-50.png";
import npmImagePath from "../../../public/npm-50.png";

const UserTerminalEnvironmentImageList = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UserTerminalEnvironments = (props) => {
  const makeImageList = () => {
    return props.defaultImages.map((image, index) => {
      return TerminalImage(image, index);
    });
  };
  return (
    <UserTerminalEnvironmentImageList>
      {makeImageList()}
    </UserTerminalEnvironmentImageList>
  );
};

UserTerminalEnvironments.propTypes = {
  defaultImages: PropTypes.arrayOf(PropTypes.string),
}

UserTerminalEnvironments.defaultProps = {
  defaultImages: [ 
    ubuntuImagePath,
    mysqlImagePath,
    nodejsImagePath,
    npmImagePath
  ],
}

export default UserTerminalEnvironments;
