import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import {
  faUbuntu,
  faCentos,
  faNode,
  faPython,
} from "@fortawesome/free-brands-svg-icons";

import { TerminalSettingContext } from "../../../stores/TerminalSetting";

const TerminalImageList = styled.section`
  font-size: 2.5rem;
  display: flex;
  margin-left: auto;
`;
// TODO 하드코딩 삭제할 것
const ICON = {
  ubuntu: faUbuntu,
  centos: faCentos,
  nodejs: faNode,
  python: faPython,
  mysql: faDatabase,
  mongodb: faDatabase,
};

const TerminalImageContainer = () => {
  const { state } = useContext(TerminalSettingContext);
  const makeImageList = () => {
    let images = [];

    Object.keys(state).map((element) => {
      const elements = ["OS", "PE", "DB"];
      if (elements.includes(element)) images = [...images, ...state[element]];
    });

    return images.map((image, index) => {
      return <FontAwesomeIcon key={"fa" + index} icon={ICON[image]} />;
    });
  };
  return <TerminalImageList>{makeImageList()}</TerminalImageList>;
};

TerminalImageContainer.propTypes = {
  defaultImages: PropTypes.arrayOf(PropTypes.string),
};

export default TerminalImageContainer;
