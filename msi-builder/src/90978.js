exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./14390.js"));
var a = l(require("./17287.js"));
var r = require("./348.js");
var s = require("./58201.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var l = o.prototype;
  l._init = function () {
    e.prototype._init.call(this);
    this._onShownAction = this._createActionByOption("onShown");
    this._popoverPositionData = [{
      my: {
        x: "center",
        y: "top"
      },
      at: {
        x: "center",
        y: "bottom"
      },
      offset: {
        x: 0,
        y: 5
      }
    }, {
      my: {
        x: "right",
        y: "center"
      },
      at: {
        x: "left",
        y: "center"
      },
      offset: {
        x: -5,
        y: 0
      }
    }, {
      my: {
        x: "center",
        y: "bottom"
      },
      at: {
        x: "center",
        y: "top"
      },
      offset: {
        x: 0,
        y: -5
      }
    }, {
      my: {
        x: "left",
        y: "center"
      },
      at: {
        x: "right",
        y: "center"
      },
      offset: {
        x: 5,
        y: 0
      }
    }];
  };
  l._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._$popoverTargetElement = (0, i.default)("<div>").addClass("dx-diagram-context-toolbox-target").appendTo(this.$element());
    var t = (0, i.default)("<div>").appendTo(this.$element());
    var n = "dx-diagram-context-toolbox";
    if (this._isTouchMode()) {
      n += " dx-diagram-touch-context-toolbox";
    }
    this._popoverInstance = this._createComponent(t, a.default, {
      hideOnOutsideClick: false,
      container: this.$element()
    });
    this._popoverInstance.$element().addClass(n);
  };
  l._isTouchMode = function () {
    return (0, r.getDiagram)().Browser.TouchUI;
  };
  l._show = function (e, t, n, o, a) {
    this._popoverInstance.hide();
    var r = (0, i.default)("<div>").addClass("dx-diagram-context-toolbox-content");
    if (this.option("toolboxWidth") !== undefined) {
      r.css("width", this.option("toolboxWidth"));
    }
    this._$popoverTargetElement.css({
      left: e + this._popoverPositionData[n].offset.x,
      top: t + this._popoverPositionData[n].offset.y
    }).show();
    var l = (0, s.getWindow)();
    var u = this._$popoverTargetElement.get(0);
    this._$popoverTargetElement.css({
      left: u.offsetLeft - (u.getBoundingClientRect().left + l.scrollX - u.offsetLeft),
      top: u.offsetTop - (u.getBoundingClientRect().top + l.scrollY - u.offsetTop)
    });
    this._popoverInstance.option({
      position: {
        my: this._popoverPositionData[n].my,
        at: this._popoverPositionData[n].at,
        of: this._$popoverTargetElement
      },
      contentTemplate: r,
      onContentReady: function () {
        var e = this;
        var t = this.$element().find(".dx-diagram-context-toolbox-content");
        this._onShownAction({
          category: o,
          callback: a,
          $element: t,
          hide: function () {
            return e._popoverInstance.hide();
          }
        });
      }.bind(this)
    });
    this._popoverInstance.show();
  };
  l._hide = function () {
    this._$popoverTargetElement.hide();
    this._popoverInstance.hide();
  };
  return o;
}(o.default);
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;