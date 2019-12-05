import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TerminalImage from "./TerminalImage";
import { TerminalSettingContext } from "../../../stores/TerminalSetting";
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
// TODO 하드코딩 삭제할 것
const defaultData = {
  ubuntu: ubuntuImagePath,
  centos: ubuntuImagePath,
  javascript: nodejsImagePath,
  python: nodejsImagePath,
  mysql: mysqlImagePath,
  mongodb: mysqlImagePath,
};

const TerminalImageContainer = (props) => {
  const { state } = useContext(TerminalSettingContext);
  const makeImageList = () => {
    // TODO 좀 더 효율적인 방법으로 리팩토링
    let images = [];

    Object.keys(state).map((element, index) => {
      if (element === "OS") {
        images = [...images, state[element].kind];
      } else if (element === "PL") {
        images = [...images, ...state[element].kind];
      } else if (element === "DB") {
        images = [...images, ...state[element].kind];
      }
    });
    return images.map((image, index) => {
      return TerminalImage(defaultData[image], index);
    });
  };
  return <TerminalImageList>{makeImageList()}</TerminalImageList>;
};

TerminalImageContainer.propTypes = {
  defaultImages: PropTypes.arrayOf(PropTypes.string),
};

TerminalImageContainer.defaultProps = {
  defaultImages: [
    ubuntuImagePath,
    mysqlImagePath,
    nodejsImagePath,
    npmImagePath,
  ],
};

export default TerminalImageContainer;
