const save = (cellManager) => {
  const data = {
    userId: "boost",
    docContent: cellManager.texts[0],
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
