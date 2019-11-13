import React from "react";

import Button from "./Button";

const EditorToolBar = () => {
  return (
    <>
      <Button type="new" />
      <Button type="save" />
      <Button type="load" />
      <Button type="code" />
      <Button type="share" />
      <Button type="terminal" />
    </>
  );
};

export default EditorToolBar;
