const save = (cellManager) => {
  const document = cellManager.createMarkdownDocument();
  const data = {
    userId: "boost",
    docContent: document,
  };
  fetch("http://localhost:9090/api/document", {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default {
  save,
};
