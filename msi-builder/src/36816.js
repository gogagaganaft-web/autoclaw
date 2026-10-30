exports.getFormatType = exports.formatDates = exports.createFormattedDateText = undefined;
var i = a(require("./91198.js"));
var o = a(require("./91500.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.createFormattedDateText = function (e) {
  var t = e.startDate;
  var n = e.endDate;
  var i = e.allDay;
  var o = e.format || r(t, n, i);
  return s(t, n, o);
};
function r(e, t, n, o) {
  if (n) {
    return "DATE";
  } else if (o && i.default.sameDate(e, t)) {
    return "TIME";
  } else {
    return "DATETIME";
  }
}
exports.getFormatType = r;
function s(e, t, n) {
  var i = e.getDate() === t.getDate();
  switch (n) {
    case "DATETIME":
      return [o.default.format(e, "monthandday"), " ", o.default.format(e, "shorttime"), " - ", i ? "" : o.default.format(t, "monthandday") + " ", o.default.format(t, "shorttime")].join("");
    case "TIME":
      return `${o.default.format(e, "shorttime")} - ${o.default.format(t, "shorttime")}`;
    case "DATE":
      return `${o.default.format(e, "monthandday")}${i ? "" : " - " + o.default.format(t, "monthandday")}`;
  }
}
exports.formatDates = s;