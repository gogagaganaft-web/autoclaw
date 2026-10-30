exports.parseHTML = exports.isTablePart = undefined;
var i;
var o = (i = require("./73349.js")) && i.__esModule ? i : {
  default: i
};
function a(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return r(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return r(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return r(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var s = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
var l = {
  default: {
    tagsCount: 0,
    startTags: "",
    endTags: ""
  },
  thead: {
    tagsCount: 1,
    startTags: "<table>",
    endTags: "</table>"
  },
  td: {
    tagsCount: 3,
    startTags: "<table><tbody><tr>",
    endTags: "</tr></tbody></table>"
  },
  col: {
    tagsCount: 2,
    startTags: "<table><colgroup>",
    endTags: "</colgroup></table>"
  },
  tr: {
    tagsCount: 2,
    startTags: "<table><tbody>",
    endTags: "</tbody></table>"
  }
};
l.tbody = l.colgroup = l.caption = l.tfoot = l.thead;
l.th = l.td;
exports.parseHTML = function (e) {
  if (typeof e != "string") {
    return null;
  }
  var t = o.default.createDocumentFragment().appendChild(o.default.createElement("div"));
  var n = s.exec(e);
  var i = n && n[1].toLowerCase();
  var r = l[i] || l.default;
  t.innerHTML = r.startTags + e + r.endTags;
  for (var u = 0; u < r.tagsCount; u++) {
    t = t.lastChild;
  }
  return a(t.childNodes);
};
exports.isTablePart = function (e) {
  var t = s.exec(e);
  return t && t[1] in l;
};