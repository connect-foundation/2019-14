import { request } from "../../utils";

const save = (cellManager) => {
  const document = cellManager.createMarkdownDocument();
  const data = {
    userId: "boost",
    docContent: document,
  };
  const result = request.do("SAVE", "PATCH", data);

  result
    .then((res) => {
      if (res.ok) alert("저장 성공!");
      else {
        alert("저장 실패ㅠㅠ");
      }
    })
    .catch((err) => {
      // console.log(err);
    });
};

export default {
  save,
};
