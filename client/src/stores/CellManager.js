import { utils } from "../utils";

const { splice } = utils;

function CellManager() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
}

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

CellManager.prototype.delete = function(index, dataObj) {
  if (dataObj.cell) this.cells = splice.delete(this.cells, index);
  if (dataObj.text) this.texts = splice.delete(this.texts, index);
  if (dataObj.tag) this.tags = splice.delete(this.tags, index);
};

CellManager.prototype.save = function() {};

CellManager.prototype.load = function() {};

export default CellManager;
