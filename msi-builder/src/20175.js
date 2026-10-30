exports.StubMaskRule = exports.MaskRule = exports.EmptyMaskRule = undefined;
var i;
var o = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./20576.js");
var l = o.default.inherit({
  ctor: function (e) {
    this._value = " ";
    (0, a.extend)(this, e);
  },
  next: function (e) {
    if (!arguments.length) {
      return this._next;
    }
    this._next = e;
  },
  text: s.noop,
  value: s.noop,
  rawValue: s.noop,
  handle: s.noop,
  _prepareHandlingArgs: function (e, t) {
    t = t || {};
    var a = Object.prototype.hasOwnProperty.call(e, "value") ? "value" : "text";
    e[a] = t.str ?? e[a];
    e.start = t.start ?? e.start;
    e.length = t.length ?? e.length;
    e.index = e.index + 1;
    return e;
  },
  reset: s.noop,
  clear: s.noop,
  first: function (e) {
    e = e || 0;
    return this.next().first(e + 1);
  },
  isAccepted: function () {
    return false;
  },
  adjustedCaret: function (e, t, n) {
    if (t) {
      return this._adjustedForward(e, 0, n);
    } else {
      return this._adjustedBackward(e, 0, n);
    }
  },
  _adjustedForward: s.noop,
  _adjustedBackward: s.noop,
  isValid: s.noop
});
var u = l.inherit({
  next: s.noop,
  handle: function () {
    return 0;
  },
  text: function () {
    return "";
  },
  value: function () {
    return "";
  },
  first: function () {
    return 0;
  },
  rawValue: function () {
    return "";
  },
  adjustedCaret: function () {
    return 0;
  },
  isValid: function () {
    return true;
  }
});
exports.EmptyMaskRule = u;
var d = l.inherit({
  text: function () {
    return (this._value !== " " ? this._value : this.maskChar) + this.next().text();
  },
  value: function () {
    return this._value + this.next().value();
  },
  rawValue: function () {
    return this._value + this.next().rawValue();
  },
  handle: function (e) {
    var t = Object.prototype.hasOwnProperty.call(e, "value") ? e.value : e.text;
    if (!t || !t.length || !e.length) {
      return 0;
    }
    if (e.start) {
      return this.next().handle(this._prepareHandlingArgs(e, {
        start: e.start - 1
      }));
    }
    var n = t[0];
    var i = t.substring(1);
    this._tryAcceptChar(n, e);
    if (this._accepted()) {
      return this.next().handle(this._prepareHandlingArgs(e, {
        str: i,
        length: e.length - 1
      })) + 1;
    } else {
      return this.handle(this._prepareHandlingArgs(e, {
        str: i,
        length: e.length - 1
      }));
    }
  },
  clear: function (e) {
    this._tryAcceptChar(" ", e);
    this.next().clear(this._prepareHandlingArgs(e));
  },
  reset: function () {
    this._accepted(false);
    this.next().reset();
  },
  _tryAcceptChar: function (e, t) {
    this._accepted(false);
    if (this._isAllowed(e, t)) {
      var n = e === " " ? this.maskChar : e;
      t.fullText = t.fullText.substring(0, t.index) + n + t.fullText.substring(t.index + 1);
      this._accepted(true);
      this._value = e;
    }
  },
  _accepted: function (e) {
    if (!arguments.length) {
      return !!this._isAccepted;
    }
    this._isAccepted = !!e;
  },
  first: function (e) {
    if (this._value === " ") {
      return e || 0;
    } else {
      return this.callBase(e);
    }
  },
  _isAllowed: function (e, t) {
    return e === " " || this._isValid(e, t);
  },
  _isValid: function (e, t) {
    var n = this.allowedChars;
    if (n instanceof RegExp) {
      return n.test(e);
    } else if ((0, r.isFunction)(n)) {
      return n(e, t.index, t.fullText);
    } else if (Array.isArray(n)) {
      return n.includes(e);
    } else {
      return n === e;
    }
  },
  isAccepted: function (e) {
    if (e === 0) {
      return this._accepted();
    } else {
      return this.next().isAccepted(e - 1);
    }
  },
  _adjustedForward: function (e, t, n) {
    if (t >= e) {
      return t;
    } else {
      return this.next()._adjustedForward(e, t + 1, n) || t + 1;
    }
  },
  _adjustedBackward: function (e, t) {
    if (t >= e - 1) {
      return e;
    } else {
      return this.next()._adjustedBackward(e, t + 1) || t + 1;
    }
  },
  isValid: function (e) {
    return this._isValid(this._value, e) && this.next().isValid(this._prepareHandlingArgs(e));
  }
});
exports.MaskRule = d;
var c = d.inherit({
  value: function () {
    return this.next().value();
  },
  handle: function (e) {
    var t = Object.prototype.hasOwnProperty.call(e, "value");
    var n = t ? e.value : e.text;
    if (!n.length || !e.length) {
      return 0;
    }
    if (e.start || t) {
      return this.next().handle(this._prepareHandlingArgs(e, {
        start: e.start && e.start - 1
      }));
    }
    var i = n[0];
    var o = n.substring(1);
    this._tryAcceptChar(i);
    var a = this._isAllowed(i) ? this._prepareHandlingArgs(e, {
      str: o,
      length: e.length - 1
    }) : e;
    return this.next().handle(a) + 1;
  },
  clear: function (e) {
    this._accepted(false);
    this.next().clear(this._prepareHandlingArgs(e));
  },
  _tryAcceptChar: function (e) {
    this._accepted(this._isValid(e));
  },
  _isValid: function (e) {
    return e === this.maskChar;
  },
  first: function (e) {
    e = e || 0;
    return this.next().first(e + 1);
  },
  _adjustedForward: function (e, t, n) {
    if (t >= e && n === this.maskChar) {
      return t;
    } else if (e === t + 1 && this._accepted()) {
      return e;
    } else {
      return this.next()._adjustedForward(e, t + 1, n);
    }
  },
  _adjustedBackward: function (e, t) {
    if (t >= e - 1) {
      return 0;
    } else {
      return this.next()._adjustedBackward(e, t + 1);
    }
  },
  isValid: function (e) {
    return this.next().isValid(this._prepareHandlingArgs(e));
  }
});
exports.StubMaskRule = c;