exports.default = undefined;
var n = {
  "=": "equal",
  "<>": "notequal",
  "<": "less",
  "<=": "lessorequal",
  ">": "greater",
  ">=": "greaterorequal",
  notcontains: "doesnotcontain",
  contains: "contains",
  startswith: "startswith",
  endswith: "endswith",
  isblank: "isblank",
  isnotblank: "isnotblank"
};
var i = {
  "=": "equal",
  "<>": "notEqual",
  "<": "lessThan",
  "<=": "lessThanOrEqual",
  ">": "greaterThan",
  ">=": "greaterThanOrEqual",
  startswith: "startsWith",
  contains: "contains",
  notcontains: "notContains",
  endswith: "endsWith",
  isblank: "isBlank",
  isnotblank: "isNotBlank",
  between: "between"
};
var o = {
  getIconByFilterOperation: function (e) {
    return n[e];
  },
  getNameByFilterOperation: function (e) {
    return i[e];
  }
};
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;