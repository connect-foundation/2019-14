import { request } from "../../utils";

const apply = () => {
  const data = {
    userId: "boost",
    containerId: 9,
  };
  const result = request.do("SHARE", "POST", data);

  result
    .then((res) => {
      if (res.ok) alert("공유 성공!");
      else {
        throw new Error("공유 실패!");
      }
      return res;
    })
    .then((res) => res.text())
    .then((shareId) => {
      localStorage.setItem("sharedDocumentId", shareId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const shareLoad = () => {};

export default {
  apply,
  shareLoad,
};
