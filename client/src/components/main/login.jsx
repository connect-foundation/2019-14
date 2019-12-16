/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { THEME } from "../../enums";
import { request } from "../../utils";

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

  .button-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    width: 100%;
    div {
      width: 40%;
      min-width: 150px;
      max-width: 500px;
      font-size: 1.5rem;
      border: 2px solid ${THEME.VS_CODE.FONT};
      margin: 0.3rem;
    }
    div:hover {
      cursor: default;
      box-shadow: 1px 1px 3px ${THEME.VS_CODE.FONT};
    }
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
      const result = await request.do("SHARE", "GET", null, shareId);
      const doc = await result.text();
      localStorage.setItem("share-document-content", doc);
      localStorage.setItem("isShared", true);
      setOpen(true);
    };
    const shareId = prompt(
      "공유 문서의 ID를 입력하세요.",
      "Input a Document ID"
    );
    if (shareId) {
      saveShareDocument(shareId);
    }
  };

  const beforeLogin = (
    <>
      {open && <Redirect to="/editor" />}
      <div className="open-share-document" onClick={openShareDocument}>
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
      <div className="button-area">
        <div
          className="login"
          onClick={() => {
            setLoginState(true);
          }}
        >
          Login
        </div>
      </div>
    </>
  );

  const afterLogin = (
    <>
      {open && <Redirect to="/editor" />}
      <div className="button-area">
        <div
          className="open-editor"
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Editor
        </div>
        {/* <div className="open-share-document" onClick={openShareDocument}>
          Open Share Document
        </div> */}
        <div
          className="logout"
          onClick={() => {
            setLoginState(false);
          }}
        >
          Logout
        </div>
      </div>
    </>
  );

  return <LoginWrapper>{loginState ? afterLogin : beforeLogin}</LoginWrapper>;
};

export default Login;
