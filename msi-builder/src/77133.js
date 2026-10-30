exports.TaskAreaContainer = undefined;
var i;
var o = (i = require("./4741.js")) && i.__esModule ? i : {
  default: i
};
function a(e) {
  return (a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function r(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, r = undefined, r = function (e, t) {
      if (a(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (a(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), a(r) === "symbol" ? r : String(r)), i);
  }
  var o;
  var r;
}
var s = function () {
  function e(e, t) {
    this._element = e;
    this._scrollView = t._createComponent(this._element, o.default, {
      scrollByContent: false,
      scrollByThumb: true,
      showScrollbar: "onHover",
      direction: "both",
      onScroll: function () {
        t.updateView();
      }
    });
  }
  var t;
  var n;
  var i;
  var a = e.prototype;
  a.getWidth = function () {
    return this._element.offsetWidth;
  };
  a.getHeight = function () {
    return this._element.offsetHeight;
  };
  a.getElement = function () {
    return this._element;
  };
  t = e;
  if (n = [{
    key: "scrollTop",
    get: function () {
      return this._scrollView.scrollTop();
    },
    set: function (e) {
      var t = e - this._scrollView.scrollTop();
      if (t !== 0) {
        this._scrollView.scrollBy({
          left: 0,
          top: t
        });
      }
    }
  }, {
    key: "scrollLeft",
    get: function () {
      return this._scrollView.scrollLeft();
    },
    set: function (e) {
      var t = e - this._scrollView.scrollLeft();
      if (t !== 0) {
        this._scrollView.scrollBy({
          left: t,
          top: 0
        });
      }
    }
  }, {
    key: "scrollWidth",
    get: function () {
      return this._scrollView.scrollWidth();
    }
  }, {
    key: "scrollHeight",
    get: function () {
      return this._scrollView.scrollHeight();
    }
  }, {
    key: "isExternal",
    get: function () {
      return true;
    }
  }]) {
    r(t.prototype, n);
  }
  if (i) {
    r(t, i);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.TaskAreaContainer = s;