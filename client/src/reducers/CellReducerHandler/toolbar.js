import { request } from "../../utils";

const save = (cellManager) => {
  const documentString = cellManager.createMarkdownDocument();

  /**
   * @todo
   * - static 데이터를 터미널 생성 id를 받아와서 적용시키기
   */
  const data = {
    containerId: 9,
    documentString,
  };
  const response = request.saveDocument(data);

  if (response.status === 500) {
    alert("저장 실패ㅠㅠ");
    return;
  }

  alert("저장 성공!");
};

export default {
  save,
};
