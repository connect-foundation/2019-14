import { uuid } from "uuidv4";
import { utils, uuidManager } from "../../utils";
import { cellGenerator } from "../../components/editor/cells/CellGenerator";

const { splice } = utils;

function CellManager() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
  this.options = [];
}

CellManager.prototype.init = function() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
  this.options = [];
};

CellManager.prototype.add = function(index, dataObj) {
  if (dataObj.cell !== undefined)
    this.cells = splice.add(this.cells, index, dataObj.cell);
  if (dataObj.text !== undefined)
    this.texts = splice.add(this.texts, index, dataObj.text);
  if (dataObj.tag !== undefined)
    this.tags = splice.add(this.tags, index, dataObj.tag);
};

CellManager.prototype.change = function(index, dataObj) {
  if (dataObj.cell !== undefined)
    this.cells = splice.change(this.cells, index, dataObj.cell);
  if (dataObj.text !== undefined)
    this.texts = splice.change(this.texts, index, dataObj.text);
  if (dataObj.tag !== undefined)
    this.tags = splice.change(this.tags, index, dataObj.tag);
};

CellManager.prototype.delete = function(index, flag) {
  if (flag.cell) this.cells = splice.delete(this.cells, index);
  if (flag.text) this.texts = splice.delete(this.texts, index);
  if (flag.tag) this.tags = splice.delete(this.tags, index);
};

CellManager.prototype.addOption = function(index, dataObj) {
  this.options[index] = dataObj;
};

CellManager.prototype.changeOption = function(index, dataObj) {
  this.options[index] = {
    ...this.options[index],
    ...dataObj,
  };
};

CellManager.prototype.deleteOneOption = function(index, key) {
  delete this.options[index][key];
};

CellManager.prototype.deleteOption = function(index) {
  delete this.options[index];
};

CellManager.prototype.pushArray = function(index, dataObj) {
  if (dataObj.cells !== undefined)
    this.cells = splice.pushArray(this.cells, index, dataObj.cells);
  if (dataObj.texts !== undefined)
    this.texts = splice.pushArray(this.texts, index, dataObj.texts);
  if (dataObj.tags !== undefined)
    this.tags = splice.pushArray(this.tags, index, dataObj.tags);
};

CellManager.prototype.popArray = function(start, end, flag) {
  if (flag.cell) this.cells = splice.popArray(this.cells, start, end);
  if (flag.text) this.texts = splice.popArray(this.texts, start, end);
  if (flag.tag) this.tags = splice.popArray(this.tags, start, end);
};

CellManager.prototype.createMarkdownDocument = function() {
  const document = [];

  for (let i = 0; i < this.texts.length; i += 1) {
    const text = this.texts[i];
    const tag = this.tags[i];
    const option = this.options[i];
    const cellData = {
      text,
      tag,
      option,
    };

    document.push(cellData);
  }

  const documentString = JSON.stringify(document);
  return documentString;
};

CellManager.prototype.load = function(document) {
  this.init();
  uuidManager.init();

  document.forEach((cellData, index) => {
    const newCellUuid = uuid();
    uuidManager.push(newCellUuid);

    const { tag, text, option } = cellData;

    const createCell = cellGenerator[tag];
    this.cells.push(createCell(newCellUuid));
    this.tags.push(tag);

    this.texts.push(text);

    this.addOption(index, option);
  });
};

export default CellManager;
