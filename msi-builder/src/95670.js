Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseSortOrder = undefined;
var i = require("./98591.js");
exports.reverseSortOrder = function (e) {
  if (e === i.SORT_ORDER.descending) {
    return i.SORT_ORDER.ascending;
  } else {
    return i.SORT_ORDER.descending;
  }
};