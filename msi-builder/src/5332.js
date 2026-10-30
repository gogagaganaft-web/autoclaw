exports.ExportLoadPanel = undefined;
var i = u(require("./68374.js"));
var o = require("./13306.js");
var a = u(require("./28109.js"));
var r = require("./35922.js");
var s = u(require("./97218.js"));
var l = u(require("./13615.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = function () {
  function e(e, t, n, o) {
    this._$targetElement = t;
    this._$container = n;
    this._loadPanel = e._createComponent((0, i.default)("<div>").addClass("dx-export-loadpanel").appendTo(this._$container), s.default, this.getOptions(o));
  }
  var t = e.prototype;
  t.getDefaultOptions = function () {
    return {
      animation: null,
      shading: false,
      height: 90,
      width: 200,
      container: this._$container
    };
  };
  t.getOptions = function (e) {
    if ((0, r.isDefined)(e.text)) {
      e.message = e.text;
    } else {
      e.message = a.default.format("dxDataGrid-exporting");
    }
    return (0, o.extend)(this.getDefaultOptions(), e);
  };
  t.show = function () {
    this._loadPanel.option("position", l.default.calculateLoadPanelPosition(this._$targetElement));
    this._loadPanel.show();
  };
  t.dispose = function () {
    (0, i.default)(this._loadPanel.element()).remove();
    delete this._loadPanel;
  };
  return e;
}();
exports.ExportLoadPanel = d;