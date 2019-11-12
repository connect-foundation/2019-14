import React from "react";
import ReactDOM from "react-dom";
import EditorPage from "./pages/EditorPage.jsx";

function App() {
  return (
    <div>
      <EditorPage />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
