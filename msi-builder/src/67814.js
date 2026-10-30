exports.default = undefined;
var i = c(require("./68374.js"));
var o = require("./58201.js");
var a = c(require("./65287.js"));
var r = c(require("./38129.js"));
var s = require("./60137.js");
var l = require("./13306.js");
var u = c(require("./72309.js"));
var d = c(require("./28109.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = (0, o.getWindow)();
var f = r.default.inherit({
  NAME: "DateView",
  getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      openOnFieldClick: true,
      applyButtonText: d.default.format("OK"),
      "dropDownOptions.showTitle": true
    });
  },
  getDisplayFormat: function (e) {
    return e || u.default.FORMATS_MAP[this.dateBox.option("type")];
  },
  popupConfig: function (e) {
    return {
      toolbarItems: this.dateBox._popupToolbarItemsConfig(),
      onInitialized: e.onInitialized,
      defaultOptionsRules: [{
        device: {
          platform: "android"
        },
        options: {
          width: 333,
          height: 331
        }
      }, {
        device: function (e) {
          var t = e.platform;
          return t === "generic" || t === "ios";
        },
        options: {
          width: "auto",
          height: "auto"
        }
      }, {
        device: function (e) {
          var t = e.platform;
          var n = e.phone;
          return t === "generic" && n;
        },
        options: {
          width: 333,
          maxWidth: "100%",
          maxHeight: "100%",
          height: "auto",
          position: {
            collision: "flipfit flip"
          }
        }
      }, {
        device: {
          platform: "ios",
          phone: true
        },
        options: {
          width: "100%",
          position: {
            my: "bottom",
            at: "bottom",
            of: h
          }
        }
      }]
    };
  },
  _renderWidget: function () {
    if ((0, s.inputType)(this.dateBox.option("mode")) && this.dateBox._isNativeType() || this.dateBox.option("readOnly")) {
      if (this._widget) {
        this._widget.$element().remove();
        this._widget = null;
      }
    } else {
      var e = this._getPopup();
      if (this._widget) {
        this._widget.option(this._getWidgetOptions());
      } else {
        var t = (0, i.default)("<div>").appendTo(e.$content());
        this._widget = this._createWidget(t);
      }
      this._widget.$element().appendTo(this._getWidgetContainer());
    }
  },
  _getWidgetName: function () {
    return a.default;
  },
  renderOpenedState: function () {
    this.callBase();
    if (this._widget) {
      this._widget.option("value", this._widget._getCurrentDate());
    }
  },
  _getWidgetOptions: function () {
    return {
      value: this.dateBoxValue() || new Date(),
      type: this.dateBox.option("type"),
      minDate: this.dateBox.dateOption("min") || new Date(1900, 0, 1),
      maxDate: this.dateBox.dateOption("max") || new Date(Date.now() + u.default.ONE_YEAR * 50),
      onDisposing: function () {
        this._widget = null;
      }.bind(this)
    };
  }
});
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;