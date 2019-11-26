import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ReplInputWrapper = styled.p.attrs(() => ({
  contentEditable: true,
}))`
  padding: 10px;
  background: green;
`;

const ReplOutputWrapper = styled.p`
  height: 10px;
  background: blue;
`;

const TerminalWrapper = styled.div`
  background: red;
  width: 100px;
  height: 100px;
`;

const ReplInputComponent = React.forwardRef((props, ref) => {
  return <ReplInputWrapper ref={ref} />;
});

const ReplOutputComponent = () => {
  return <ReplOutputWrapper />;
};

const KEY = {
  ENTER: "enter",
  DOWN: "down",
};

const handlers = {};
const addHandler = (keyboardHandler) => {
  handlers.terminal = keyboardHandler;

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handlers.terminal[KEY.ENTER](e);
    }
  });
};

const ReplCell = ({ isKeyDown }) => {
  const ref = useRef(null);

  useEffect(() => {
    const isComponentFocus = isKeyDown && ref && ref.current;
    if (isComponentFocus) {
      ref.current.focus();
    }
  }, [isKeyDown, ref]);

  return (
    <>
      <ReplInputComponent ref={ref} />
      <ReplOutputComponent />
    </>
  );
};

ReplCell.propTypes = {
  isKeyDown: PropTypes.bool,
};

ReplCell.defaultProps = {
  isKeyDown: true,
};

const TerminalCell = ({ cellUuid }) => {
  const [replComponents, setReplComponents] = useState([]);

  const keyboardHandler = {
    [KEY.ENTER]: (e) => {
      e.preventDefault();
      const newOne = <ReplCell isKeyDown />;
      setReplComponents((prevState) => {
        return [...prevState, newOne];
      });
    },
  };

  useEffect(() => {
    addHandler(keyboardHandler);

    const firstOne = <ReplCell isKeyDown />;
    setReplComponents((prevState) => [...prevState, firstOne]);
  }, []);

  const renderRepls = () => {
    return replComponents.map((component, index) => {
      const componentKey = `repl${index}`;
      return <ReplCell key={componentKey} />;
    });
  };

  return <TerminalWrapper>{renderRepls()}</TerminalWrapper>;
};

TerminalCell.propTypes = {
  cellUuid: PropTypes.string.isRequired,
};

export default TerminalCell;
