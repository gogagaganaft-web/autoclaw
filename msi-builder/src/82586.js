exports.MobileTooltipStrategy = undefined;
var i;
var o = require("./58664.js");
var a = (i = require("./89799.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./25359.js");
var s = require("./58201.js");
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = 250;
var d = "90%";
var c = "auto";
var h = "100%";
var f = "80%";
var p = {
  show: {
    type: "slide",
    duration: 300,
    from: {
      position: {
        my: "top",
        at: "bottom",
        of: (0, s.getWindow)()
      }
    },
    to: {
      position: {
        my: "center",
        at: "center",
        of: (0, s.getWindow)()
      }
    }
  },
  hide: {
    type: "slide",
    duration: 300,
    to: {
      position: {
        my: "top",
        at: "bottom",
        of: (0, s.getWindow)()
      }
    },
    from: {
      position: {
        my: "center",
        at: "center",
        of: (0, s.getWindow)()
      }
    }
  }
};
var g = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var r = i.prototype;
  r._shouldUseTarget = function () {
    return false;
  };
  r._onShowing = function () {
    var e = (0, o.getWidth)((0, s.getWindow)()) > 700;
    this._tooltip.option("height", c);
    var t = (0, o.getOuterHeight)(this._list.$element());
    this._tooltip.option(e ? function (e) {
      var t = (0, o.getHeight)((0, s.getWindow)()) * 0.9;
      return {
        shading: true,
        width: f,
        height: e > t ? d : c,
        position: {
          my: "center",
          at: "center",
          of: (0, s.getWindow)()
        }
      };
    }(t) : function (e) {
      return {
        shading: false,
        width: h,
        height: e > u ? u : c,
        position: {
          my: "bottom",
          at: "bottom",
          of: (0, s.getWindow)()
        }
      };
    }(t));
  };
  r._createTooltip = function (e, t) {
    var n = this;
    var i = this._createTooltipElement("dx-scheduler-overlay-panel");
    return this._options.createComponent(i, a.default, {
      target: (0, s.getWindow)(),
      hideOnOutsideClick: true,
      animation: p,
      onShowing: function () {
        return n._onShowing();
      },
      onShown: this._onShown.bind(this),
      contentTemplate: this._getContentTemplate(t),
      wrapperAttr: {
        class: "dx-scheduler-overlay-panel"
      }
    });
  };
  return i;
}(r.TooltipStrategyBase);
exports.MobileTooltipStrategy = g;