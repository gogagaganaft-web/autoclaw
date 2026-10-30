exports.default = undefined;
var i = s(require("./55994.js"));
var o = require("./39611.js");
var a = s(require("./47810.js"));
var r = require("./3532.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = ["deleteContentBackward", "deleteSoftLineBackward", "deleteContent", "deleteHardLineBackward"];
var u = ["historyUndo", "historyRedo"];
var d = ["focusIn", "focusOut", "input", "paste", "cut", "drop", "beforeInput"];
function c(e) {
  return " ".repeat(e);
}
var h = function () {
  function e(e) {
    this.editor = e;
  }
  var t = e.prototype;
  t._editorOption = function () {
    var e;
    return (e = this.editor).option.apply(e, arguments);
  };
  t._editorInput = function () {
    return this.editor._input();
  };
  t._editorCaret = function (e) {
    if (!e) {
      return this.editor._caret();
    }
    this.editor._caret(e);
  };
  t._attachChangeEventHandler = function () {
    var e = this;
    if (this._editorOption("valueChangeEvent").split(" ").includes("change")) {
      var t = this._editorInput();
      var n = (0, o.addNamespace)("blur beforedeactivate", "dxMask");
      i.default.on(t, n, function (t) {
        e.editor._changeHandler(t);
      });
    }
  };
  t._beforeInputHandler = function () {
    this._previousText = this._editorOption("text");
    this._prevCaret = this._editorCaret();
  };
  t._inputHandler = function (e) {
    var t = e.originalEvent;
    if (t) {
      var n = t.inputType;
      if (u.includes(n)) {
        this._handleHistoryInputEvent();
      } else if (l.includes(n)) {
        this._handleBackwardDeleteInputEvent();
      } else {
        var i = this._editorCaret();
        if (!i.end) {
          return;
        }
        this._clearSelectedText();
        this._autoFillHandler(t);
        this._editorCaret(i);
        this._handleInsertTextInputEvent(t.data);
      }
      if (this._editorOption("text") === this._previousText) {
        e.stopImmediatePropagation();
      }
    }
  };
  t._handleHistoryInputEvent = function () {
    var e = this._editorCaret();
    this._updateEditorMask({
      start: e.start,
      length: e.end - e.start,
      text: ""
    });
    this._editorCaret(this._prevCaret);
  };
  t._handleBackwardDeleteInputEvent = function () {
    this._clearSelectedText();
    var e = this._editorCaret();
    this.editor.setForwardDirection();
    this.editor._adjustCaret();
    if (this._editorCaret().start !== e.start) {
      this.editor.setBackwardDirection();
      this.editor._adjustCaret();
    }
  };
  t._clearSelectedText = function () {
    var n = this._prevCaret?.end - this._prevCaret?.start || 1;
    var i = this._editorCaret();
    if (!this._isAutoFill()) {
      this.editor.setBackwardDirection();
      this._updateEditorMask({
        start: i.start,
        length: n,
        text: c(n)
      });
    }
  };
  t._handleInsertTextInputEvent = function (e) {
    var i = e ?? "";
    this.editor.setForwardDirection();
    if (!this._updateEditorMask({
      start: this._prevCaret?.start ?? 0,
      length: i.length || 1,
      text: i
    })) {
      this._editorCaret(this._prevCaret);
    }
  };
  t._updateEditorMask = function (e) {
    var t = e.text.length;
    var n = this.editor._handleChain(e);
    this.editor._displayMask();
    if (this.editor.isForwardDirection()) {
      var i = this._editorCaret();
      var o = i.start;
      var a = i.end;
      var r = n - t;
      if (n > 1 && t === 1) {
        this._editorCaret({
          start: o + r,
          end: a + r
        });
      }
      this.editor._adjustCaret();
    }
    return !!n;
  };
  t._focusInHandler = function () {
    var e = this;
    this.editor._showMaskPlaceholder();
    this.editor.setForwardDirection();
    if (!this.editor._isValueEmpty() && this._editorOption("isValid")) {
      this.editor._adjustCaret();
    } else {
      var t = this.editor._maskRulesChain.first();
      this._caretTimeout = setTimeout(function () {
        e._editorCaret({
          start: t,
          end: t
        });
      }, 0);
    }
  };
  t._focusOutHandler = function (e) {
    this.editor._changeHandler(e);
    if (this._editorOption("showMaskMode") === "onFocus" && this.editor._isValueEmpty()) {
      this._editorOption("text", "");
      this.editor._renderDisplayText("");
    }
  };
  t._delHandler = function (e) {
    var t = this.editor;
    t._maskKeyHandler(e, function () {
      if (!t._hasSelection()) {
        t._handleKey(" ");
      }
    });
  };
  t._cutHandler = function (e) {
    var t = this._editorCaret();
    var n = this._editorInput().val().substring(t.start, t.end);
    this.editor._maskKeyHandler(e, function () {
      return (0, r.clipboardText)(e, n);
    });
  };
  t._dropHandler = function () {
    var e = this;
    this._clearDragTimer();
    this._dragTimer = setTimeout(function () {
      var t = e.editor._convertToValue(e._editorInput().val());
      e._editorOption("value", t);
    });
  };
  t._pasteHandler = function (e) {
    var t = this.editor;
    if (!this._editorOption("disabled")) {
      var n = this._editorCaret();
      t._maskKeyHandler(e, function () {
        var i = (0, r.clipboardText)(e);
        var o = t._maskRulesChain.text().substring(n.end);
        var a = t._handleChain({
          text: i,
          start: n.start,
          length: i.length
        });
        var s = n.start + a;
        t._handleChain({
          text: o,
          start: s,
          length: o.length
        });
        t._caret({
          start: s,
          end: s
        });
      });
    }
  };
  t._autoFillHandler = function (e) {
    var t = this;
    var n = this.editor;
    var i = this._editorInput().val();
    this._inputHandlerTimer = setTimeout(function () {
      if (t._isAutoFill()) {
        n._maskKeyHandler(e, function () {
          n._handleChain({
            text: i,
            start: 0,
            length: i.length
          });
        });
        n._validateMask();
      }
    });
  };
  t._isAutoFill = function () {
    var e = this._editorInput();
    if (a.default.webkit) {
      var t;
      var n = e.get(0);
      return (t = n == null ? undefined : n.matches(":-webkit-autofill")) !== null && t !== undefined && t;
    }
    return false;
  };
  t._clearDragTimer = function () {
    clearTimeout(this._dragTimer);
  };
  t.getHandler = function (e) {
    var t = this;
    return function (n) {
      var i;
      if ((i = t[`_${e}Handler`]) !== null && i !== undefined) {
        i.call(t, n);
      }
    };
  };
  t.attachEvents = function () {
    var e = this;
    var t = this._editorInput();
    d.forEach(function (n) {
      var a = (0, o.addNamespace)(n.toLowerCase(), "dxMask");
      i.default.on(t, a, e.getHandler(n));
    });
    this._attachChangeEventHandler();
  };
  t.detachEvents = function () {
    i.default.off(this._editorInput(), `.dxMask`);
  };
  t.clean = function () {
    this._clearDragTimer();
    clearTimeout(this._caretTimeout);
    clearTimeout(this._inputHandlerTimer);
  };
  return e;
}();
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;