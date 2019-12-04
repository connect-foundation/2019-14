import { utils } from "../utils";

const { splice } = utils;

function CellManager() {
  this.cells = [];
  this.texts = [];
  this.tags = [];
}

CellManager.prototype.addAll = function(index, dataObj) {
  this.cells = splice.add(this.cells, index, dataObj.cell);
  this.texts = splice.add(this.texts, index, dataObj.text);
  this.tags = splice.add(this.tags, index, dataObj.tag);
};

CellManager.prototype.changeAll = function(index, dataObj) {
  this.cells = splice.change(this.cells, index, dataObj.cell);
  this.texts = splice.change(this.texts, index, dataObj.text);
  this.tags = splice.change(this.tags, index, dataObj.tag);
};

CellManager.prototype.deleteAll = function(index) {
  this.cells = splice.delete(this.cells, index);
  this.texts = splice.delete(this.texts, index);
  this.tags = splice.delete(this.tags, index);
};

CellManager.prototype.save = function() {};

CellManager.prototype.load = function() {};

export default CellManager;
