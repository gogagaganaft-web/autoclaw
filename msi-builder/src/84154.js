exports.mergeStylesWithColor = exports.getReducedIconTooltipText = exports.getAppointmentStyles = exports.getAppointmentKey = undefined;
var i = require("./97205.js");
var o = r(require("./28109.js"));
var a = r(require("./91500.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.getAppointmentStyles = function (e) {
  var t = e.geometry;
  var n = t.height;
  var o = t.left;
  var a = t.top;
  var r = t.width;
  return (0, i.addToStyles)([{
    attr: "height",
    value: `${n || 50}px`
  }, {
    attr: "width",
    value: `${r || 50}px`
  }, {
    attr: "top",
    value: `${a}px`
  }, {
    attr: "left",
    value: `${o}px`
  }]);
};
exports.getAppointmentKey = function (e) {
  var t = e.height;
  var n = e.left;
  var i = e.top;
  var o = e.width;
  return `${n}-${i}-${o}-${t}`;
};
exports.getReducedIconTooltipText = function (e) {
  var t = o.default.format("dxScheduler-editorLabelEndDate");
  if (!e) {
    return t;
  }
  var n = new Date(e);
  var i = a.default.format(n, "monthAndDay");
  var r = a.default.format(n, "year");
  return `${t}: ${i}, ${r}`;
};
exports.mergeStylesWithColor = function (e, t) {
  if (e) {
    return (0, i.addToStyles)([{
      attr: "backgroundColor",
      value: e
    }], t);
  } else {
    return t;
  }
};