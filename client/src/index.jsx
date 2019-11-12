import React from "react";
import ReactDOM from "react-dom";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <div>
      <EditorPage />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
