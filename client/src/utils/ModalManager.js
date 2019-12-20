const modalManager = {
  setOpen: null,
  setData: null,
};

const injectSetState = (setOpen, setData) => {
  modalManager.setOpen = setOpen;
  modalManager.setData = setData;
};

const closeModal = () => {
  modalManager.setOpen(false);
};

const setModalLabel = (label) => {
  modalManager.setData({
    label,
  });
};

const setModalContents = (contents) => {
  modalManager.setData({
    contents,
  });
};

const openModal = (label, contents) => {
  setModalLabel(label);
  setModalContents(contents);
  modalManager.setOpen(true);
};

export default {
  injectSetState,
  closeModal,
  openModal,
};
