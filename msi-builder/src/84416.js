exports.default = undefined;
var i = require("./20576.js");
var o = d(require("./38129.js"));
var a = require("./60137.js");
var r = d(require("./72309.js"));
var s = d(require("./69434.js"));
var l = require("./13306.js");
var u = d(require("./20530.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = o.default.inherit({
  NAME: "Native",
  popupConfig: function (e) {
    return (0, l.extend)({}, e, {
      width: "auto"
    });
  },
  getParsedText: function (e) {
    if (e) {
      if (this.dateBox.option("type") === "datetime") {
        return new Date(e.replace(/-/g, "/").replace("T", " ").split(".")[0]);
      } else {
        return r.default.fromStandardDateFormat(e);
      }
    } else {
      return null;
    }
  },
  renderPopupContent: i.noop,
  _getWidgetName: i.noop,
  _getWidgetOptions: i.noop,
  _getDateBoxType: function () {
    var e = this.dateBox.option("type");
    if (r.default.SUPPORTED_FORMATS.includes(e)) {
      if (e === "datetime" && !(0, a.inputType)(e)) {
        e = "datetime-local";
      }
    } else {
      e = "date";
    }
    return e;
  },
  customizeButtons: function () {
    var e = this.dateBox.getButton("dropDown");
    if (u.default.real().android && e) {
      e.on("click", function () {
        this.dateBox._input().get(0).click();
      }.bind(this));
    }
  },
  getDefaultOptions: function () {
    return {
      mode: this._getDateBoxType()
    };
  },
  getDisplayFormat: function (e) {
    var t = this._getDateBoxType();
    return e || r.default.FORMATS_MAP[t];
  },
  renderInputMinMax: function (e) {
    e.attr({
      min: s.default.serializeDate(this.dateBox.dateOption("min"), "yyyy-MM-dd"),
      max: s.default.serializeDate(this.dateBox.dateOption("max"), "yyyy-MM-dd")
    });
  }
});
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;