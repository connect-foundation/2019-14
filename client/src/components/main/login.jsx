/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { THEME } from "../../enums";
import { request, modalManager } from "../../utils";

const { openModal, closeModal } = modalManager;

const LoginWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  input {
    margin: 0.3rem;
    width: 40%;
    min-width: 150px;
    max-width: 500px;
    font-size: 1.5rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 100%;
  .btn-common {
    width: 40%;
    min-width: 150px;
    max-width: 500px;
    font-size: 1.5rem;
    border: 2px solid ${THEME.VS_CODE.FONT};
    margin: 0.3rem;
  }
  .btn-common:hover {
    cursor: default;
    box-shadow: 1px 1px 3px ${THEME.VS_CODE.FONT};
  }
`;

const Login = () => {
  const [loginState, setLoginState] = useState(false);
  const [open, setOpen] = useState(false);

  const onKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      setLoginState(true);
    }
  };

  const openShareDocument = () => {
    const saveShareDocument = async (shareId) => {
      const response = await request.loadSharingDocument(shareId);

      if (response.status === 500) {
        const label = "공유 문서 불러오기 실패";
        const modalContents =
          "공유 문서를 불러오는 것에 실패하였습니다.\n 다시 시도해 주세요.";
        openModal(label, modalContents);
        return;
      }
      const document = response.data;
      const documentString = JSON.stringify(document);
      localStorage.setItem("share-document-content", documentString);
      localStorage.setItem("isShared", true);
      setOpen(true);
    };

    const label = "공유 문서 불러오기";
    const submitShareIdEvent = () => {
      const shareIdInputElement = document.querySelector(
        "#share-id-input-text"
      );
      const shareId = shareIdInputElement.value;
      closeModal();
      if (shareId) {
        saveShareDocument(shareId);
      }
    };
    const modalContents = (
      <>
        <input
          type="text"
          id="share-id-input-text"
          autoFocus
          spellCheck={false}
          onKeyPress={(e) => {
            const { key } = e;
            if (key === "Enter") {
              e.preventDefault();
              submitShareIdEvent();
            }
          }}
        />
        <input type="button" value="불러오기" onClick={submitShareIdEvent} />
      </>
    );
    openModal(label, modalContents);
  };

  const beforeLogin = (
    <>
      {open && <Redirect to="/editor" />}
      <div className="btn-common" onClick={openShareDocument}>
        Open Share Document
      </div>
      <input type="text" id="id" name="id" placeholder="ID" />
      <input
        type="password"
        id="pw"
        name="pw"
        placeholder="password"
        onKeyPress={onKeyPress}
      />
      <div
        className="btn-common"
        onClick={() => {
          setLoginState(true);
        }}
      >
        Login
      </div>
    </>
  );

  const afterLogin = (
    <>
      {open && <Redirect to="/editor" />}
      <div
        className="btn-common"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Editor
      </div>
      <div
        className="btn-common"
        onClick={() => {
          setLoginState(false);
        }}
      >
        Logout
      </div>
    </>
  );

  return <LoginWrapper>{loginState ? afterLogin : beforeLogin}</LoginWrapper>;
};

export default Login;
