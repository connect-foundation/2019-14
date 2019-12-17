import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { modalManager } from "../../utils";

const { injectSetState, closeModal } = modalManager;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const SimpleModalWrapper = styled.div`
  input[type="button"] {
    font-size: 1rem;
    text-align: center;
  }
`;

Modal.setAppElement("#root");
const SimpleModal = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    label: "",
    contents: <span />,
  });
  injectSetState(setOpen, setData);

  return (
    <SimpleModalWrapper
      onClick={(e) => {
        const { classList } = e.target;
        const isOverlay = classList[0] === "ReactModal__Overlay";
        if (isOverlay) modalManager.setOpen(false);
      }}
    >
      <Modal isOpen={open} style={customStyles} contentLabel={data.label}>
        {data.contents}
        <input type="button" onClick={closeModal} value="닫기" />
      </Modal>
    </SimpleModalWrapper>
  );
};

export default SimpleModal;
