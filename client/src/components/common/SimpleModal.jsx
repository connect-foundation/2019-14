import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { modalManager } from "../../utils";
import SimpleModalContentsWrapper from "./SimpleModalContentsWrapper";

const { injectSetState, closeModal } = modalManager;

const customStyles = {
  overlay: {
    background: "rgba(255, 255, 255, 0.2)",
  },
  content: {
    width: "40%",
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const SimpleModalWrapper = styled.div``;

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
        if (isOverlay) modalManager.closeModal();
      }}
    >
      <Modal
        isOpen={open}
        style={customStyles}
        contentLabel={data.label}
        id="simple-modal-overlay"
      >
        <SimpleModalContentsWrapper>
          {data.contents}
          <input type="button" onClick={closeModal} value="닫기" />
        </SimpleModalContentsWrapper>
      </Modal>
    </SimpleModalWrapper>
  );
};

export default SimpleModal;
