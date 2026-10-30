exports.default = undefined;
var i = s(require("./68374.js"));
var o = s(require("./55994.js"));
var a = s(require("./38377.js"));
var r = require("./39611.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  return {
    keyName: (0, r.normalizeKeyName)(e),
    key: e.key,
    code: e.code,
    ctrl: e.ctrlKey,
    location: e.location,
    metaKey: e.metaKey,
    shift: e.shiftKey,
    alt: e.altKey,
    which: e.which,
    originalEvent: e
  };
}
var u = a.default.inherit({
  _keydown: (0, r.addNamespace)("keydown", "KeyboardProcessor"),
  _compositionStart: (0, r.addNamespace)("compositionstart", "KeyboardProcessor"),
  _compositionEnd: (0, r.addNamespace)("compositionend", "KeyboardProcessor"),
  ctor: function (e) {
    var t = this;
    if ((e = e || {}).element) {
      this._element = (0, i.default)(e.element);
    }
    if (e.focusTarget) {
      this._focusTarget = e.focusTarget;
    }
    this._handler = e.handler;
    if (this._element) {
      this._processFunction = function (e) {
        var n = (0, i.default)(t._focusTarget).toArray();
        var o = t._focusTarget && t._focusTarget !== e.target && !n.includes(e.target);
        var a = t._isComposingJustFinished && e.which === 229 || t._isComposing || o;
        t._isComposingJustFinished = false;
        if (!a) {
          t.process(e);
        }
      };
      this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
      o.default.on(this._element, this._keydown, this._processFunction);
      o.default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
      o.default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
  },
  dispose: function () {
    if (this._element) {
      o.default.off(this._element, this._keydown, this._processFunction);
      o.default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
      o.default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
    this._element = undefined;
    this._handler = undefined;
  },
  process: function (e) {
    this._handler(l(e));
  },
  toggleProcessing: function (e) {
    var t = e.type;
    this._isComposing = t === "compositionstart";
    this._isComposingJustFinished = !this._isComposing;
  }
});
u.createKeyDownOptions = l;
var d = u;
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;