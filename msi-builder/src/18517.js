exports.default = undefined;
var i = p(require("./68374.js"));
var o = require("./58201.js");
var a = p(require("./73349.js"));
var r = p(require("./55994.js"));
var s = p(require("./24311.js"));
var l = require("./35922.js");
var u = require("./13306.js");
var d = p(require("./93786.js"));
var c = p(require("./99393.js"));
var h = p(require("./89799.js"));
var f = require("./75811.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = (0, o.getWindow)();
var m = s.default.add;
var _ = ["info", "warning", "error", "success"];
var v = [];
var y = {
  top: {
    my: "top",
    at: "top",
    of: null,
    offset: "0 0"
  },
  bottom: {
    my: "bottom",
    at: "bottom",
    of: null,
    offset: "0 -20"
  },
  center: {
    my: "center",
    at: "center",
    of: null,
    offset: "0 0"
  },
  right: {
    my: "center right",
    at: "center right",
    of: null,
    offset: "0 0"
  },
  left: {
    my: "center left",
    at: "center left",
    of: null,
    offset: "0 0"
  }
};
var b = {
  h: 0,
  v: 0
};
m(function () {
  r.default.subscribeGlobal(a.default.getDocument(), d.default.down, function (e) {
    for (var t = v.length - 1; t >= 0; t--) {
      if (!v[t]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
var x = h.default.inherit({
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      message: "",
      type: "info",
      displayTime: 2000,
      position: "bottom center",
      animation: {
        show: {
          type: "fade",
          duration: 400,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 400,
          from: 1,
          to: 0
        }
      },
      shading: false,
      height: "auto",
      hideTopOverlayHandler: null,
      preventScrollEvents: false,
      closeOnSwipe: true,
      closeOnClick: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: {
        platform: "android"
      },
      options: {
        hideOnOutsideClick: true,
        width: "auto",
        animation: {
          show: {
            type: "slide",
            duration: 200,
            from: {
              position: {
                my: "top",
                at: "bottom",
                of: g
              }
            }
          },
          hide: {
            type: "slide",
            duration: 200,
            to: {
              position: {
                my: "top",
                at: "bottom",
                of: g
              }
            }
          }
        }
      }
    }, {
      device: function (e) {
        var t = e.deviceType === "phone";
        var n = e.platform === "android";
        return t && n;
      },
      options: {
        width: "100vw",
        position: {
          at: "bottom center",
          my: "bottom center",
          offset: "0 0"
        }
      }
    }, {
      device: function (e) {
        return e.deviceType === "phone";
      },
      options: {
        width: "100vw"
      }
    }, {
      device: function () {
        return (0, f.isMaterial)();
      },
      options: {
        minWidth: 344,
        maxWidth: 568,
        displayTime: 4000
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._posStringToObject();
  },
  _renderContentImpl: function () {
    this._message = (0, i.default)("<div>").addClass("dx-toast-message").text(this.option("message")).appendTo(this.$content());
    this.setAria("role", "alert", this._message);
    if (_.includes(this.option("type").toLowerCase())) {
      this.$content().prepend((0, i.default)("<div>").addClass("dx-toast-icon"));
    }
    this.callBase();
  },
  _render: function () {
    this.callBase();
    this.$element().addClass("dx-toast");
    this.$wrapper().addClass("dx-toast-wrapper");
    this.$content().addClass("dx-toast-" + String(this.option("type")).toLowerCase());
    this.$content().addClass("dx-toast-content");
    this._toggleCloseEvents("Swipe");
    this._toggleCloseEvents("Click");
  },
  _toggleCloseEvents: function (e) {
    var t = "dx" + e.toLowerCase();
    r.default.off(this.$content(), t);
    if (this.option("closeOn" + e)) {
      r.default.on(this.$content(), t, this.hide.bind(this));
    }
  },
  _posStringToObject: function () {
    if ((0, l.isString)(this.option("position"))) {
      var e = this.option("position").split(" ")[0];
      var t = this.option("position").split(" ")[1];
      this.option("position", (0, u.extend)({
        boundaryOffset: b
      }, y[e]));
      switch (t) {
        case "center":
        case "left":
        case "right":
          this.option("position").at += " " + t;
          this.option("position").my += " " + t;
      }
    }
  },
  _show: function () {
    return this.callBase.apply(this, arguments).always(function () {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = setTimeout(this.hide.bind(this), this.option("displayTime"));
    }.bind(this));
  },
  _overlayStack: function () {
    return v;
  },
  _zIndexInitValue: function () {
    return this.callBase() + 8000;
  },
  _dispose: function () {
    clearTimeout(this._hideTimeout);
    this.callBase();
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "type":
        this.$content().removeClass("dx-toast-" + e.previousValue);
        this.$content().addClass("dx-toast-" + String(e.value).toLowerCase());
        break;
      case "message":
        if (this._message) {
          this._message.text(e.value);
        }
        break;
      case "closeOnSwipe":
        this._toggleCloseEvents("Swipe");
        break;
      case "closeOnClick":
        this._toggleCloseEvents("Click");
        break;
      case "displayTime":
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, c.default)("dxToast", x);
var w = x;
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;