import { request } from "../../utils";

const save = (cellManager) => {
  const document = cellManager.createMarkdownDocument();
  /**
   * @todo
   * - request 모듈의 do에 uri에다가 userId를 붙여야댐
   * - 나중에 추가할 것! 필수!
   */
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
      console.log(err);
    });
};

const load = (cellManager) => {
  const result = request.do("LOAD");
  result
    .then((res) => res.text())
    .then((doc) => {
      cellManager.load(doc);
    });
};

export default {
  save,
  load,
};
