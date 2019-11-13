import React from "react";

import Button from "./Button";

const EditorToolBar = () => {
  const types = ["new", "save", "load", "code", "share", "terminal"];

  return (
    <>
      {types.map((type) => {
        return <Button type={type} />;
      })}
    </>
  );
};

export default EditorToolBar;
