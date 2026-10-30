exports.renderAppointments = undefined;
var i = r(require("./68374.js"));
var o = require("./9259.js");
var a = r(require("./55304.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.renderAppointments = function (e) {
  var t = e.instance;
  var n = e.$dateTable;
  var i = e.viewModel;
  var r = s(n);
  o.utils.renovation.renderComponent(t, r, a.default, "renovatedAppointments", i);
};
function s(e) {
  var t = (0, i.default)(".dx-appointments-container");
  if (t.length === 0) {
    t = (0, i.default)("<div>").addClass("dx-appointments-container").appendTo(e);
  }
  return t;
}