import { request, modalManager } from "../../utils";

const { openModal } = modalManager;

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
    const label = "저장 실패";
    const modalContents = "저장에 실패하였습니다.\n 다시 시도해 주세요.";
    openModal(label, modalContents);
    return;
  }
  const label = "저장 성공";
  const modalContents = "저장하였습니다.";
  openModal(label, modalContents);
};

export default {
  save,
};
