exports.default = undefined;
var i;
var o = (i = require("./20476.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./20576.js");
var r = require("./90330.js");
function s(e) {
  return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var l = {
  querySelectorAll: function (e, t) {
    return e.querySelectorAll(t);
  },
  elementMatches: function (e, t) {
    var n = this;
    return (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function (t) {
      var i = e.document || e.ownerDocument;
      if (!i) {
        return false;
      }
      for (var o = n.querySelectorAll(i, t), a = 0; a < o.length; a++) {
        if (o[a] === e) {
          return true;
        }
      }
    }).call(e, t);
  },
  createElement: function (e, t) {
    return (t = t || this._document).createElement(e);
  },
  createElementNS: function (e, t, n) {
    return (n = n || this._document).createElementNS(e, t);
  },
  createTextNode: function (e, t) {
    return (t = t || this._document).createTextNode(e);
  },
  createAttribute: function (e, t) {
    return (t = t || this._document).createAttribute(e);
  },
  isNode: function (e) {
    return e && s(e) === "object" && "nodeType" in e && "nodeName" in e;
  },
  isElementNode: function (e) {
    return e && e.nodeType === 1;
  },
  isTextNode: function (e) {
    return e && e.nodeType === 3;
  },
  isDocument: function (e) {
    return e && e.nodeType === 9;
  },
  isDocumentFragment: function (e) {
    return e && e.nodeType === 11;
  },
  removeElement: function (e) {
    var t = e && e.parentNode;
    if (t) {
      t.removeChild(e);
    }
  },
  insertElement: function (e, t, n) {
    if (e && t && e !== t) {
      if (n) {
        e.insertBefore(t, n);
      } else {
        e.appendChild(t);
      }
    }
  },
  getAttribute: function (e, t) {
    return e.getAttribute(t);
  },
  setAttribute: function (e, t, n) {
    if (t === "style") {
      e.style.cssText = n;
    } else {
      e.setAttribute(t, n);
    }
  },
  removeAttribute: function (e, t) {
    e.removeAttribute(t);
  },
  setProperty: function (e, t, n) {
    e[t] = n;
  },
  setText: function (e, t) {
    if (e) {
      e.textContent = t;
    }
  },
  setClass: function (e, t, n) {
    if (e.nodeType === 1 && t) {
      if (n) {
        e.classList.add(t);
      } else {
        e.classList.remove(t);
      }
    }
  },
  setStyle: function (e, t, n) {
    e.style[t] = n || "";
  },
  _document: typeof document == "undefined" ? undefined : document,
  getDocument: function () {
    return this._document;
  },
  getActiveElement: function (e) {
    return this.getRootNode(e).activeElement;
  },
  getRootNode: function (e) {
    var n;
    return (e == null || (n = e.getRootNode) === null || n === undefined ? undefined : n.call(e)) ?? this._document;
  },
  getBody: function () {
    return this._document.body;
  },
  createDocumentFragment: function () {
    return this._document.createDocumentFragment();
  },
  getDocumentElement: function () {
    return this._document.documentElement;
  },
  getLocation: function () {
    return this._document.location;
  },
  getSelection: function () {
    return this._document.selection;
  },
  getReadyState: function () {
    return this._document.readyState;
  },
  getHead: function () {
    return this._document.head;
  },
  hasDocumentProperty: function (e) {
    return e in this._document;
  },
  listen: function (e, t, n, i) {
    if (e && "addEventListener" in e) {
      e.addEventListener(t, n, i);
      return function () {
        e.removeEventListener(t, n);
      };
    } else {
      return a.noop;
    }
  },
  elementsFromPoint: function (e, t, n) {
    var i = this.getRootNode(n);
    if (i.host) {
      return (0, r.getShadowElementsFromPoint)(e, t, i);
    } else {
      return i.elementsFromPoint(e, t);
    }
  }
};
var u = (0, o.default)(l);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;