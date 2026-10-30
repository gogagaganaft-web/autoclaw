Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupFilter = function (e, t) {
  var n = (0, o.normalizeSortingInfo)(t.group);
  var i = [];
  for (var r = 0; r < e.length; r++) {
    i.push([n[r].selector, "=", e[r]]);
  }
  if (t.filter) {
    i.push(t.filter);
  }
  return a.default.combineFilters(i);
};
var i;
var o = require("./16454.js");
var a = (i = require("./60082.js")) && i.__esModule ? i : {
  default: i
};