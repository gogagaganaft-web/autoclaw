exports.TextEditorLabel = undefined;
var i = a(require("./68374.js"));
var o = a(require("./73176.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var r = function () {
  function e(e) {
    var t = e.$editor;
    var n = e.text;
    var i = e.mode;
    var a = e.mark;
    var r = e.containsButtonsBefore;
    var s = e.containerWidth;
    var l = e.beforeWidth;
    this._props = {
      $editor: t,
      text: n,
      mode: i,
      mark: a,
      containsButtonsBefore: r,
      containerWidth: s,
      beforeWidth: l
    };
    this._id = `dx-texteditor-label-${new o.default()}`;
    this._render();
    this._toggleMarkupVisibility();
  }
  var t = e.prototype;
  t._isVisible = function () {
    return !!this._props.text && this._props.mode !== "hidden";
  };
  t._render = function () {
    this._$before = (0, i.default)("<div>").addClass("dx-label-before");
    this._$labelSpan = (0, i.default)("<span>");
    this._$label = (0, i.default)("<div>").addClass("dx-label").append(this._$labelSpan);
    this._$after = (0, i.default)("<div>").addClass("dx-label-after");
    this._$root = (0, i.default)("<div>").addClass("dx-texteditor-label").attr("id", this._id).append(this._$before).append(this._$label).append(this._$after);
    this._updateMark();
    this._updateText();
    this._updateBeforeWidth();
    this._updateMaxWidth();
  };
  t._toggleMarkupVisibility = function () {
    var e = this._isVisible();
    this._updateEditorBeforeButtonsClass(e);
    this._updateEditorLabelClass(e);
    if (e) {
      this._$root.appendTo(this._props.$editor);
    } else {
      this._$root.detach();
    }
  };
  t._updateEditorLabelClass = function (e) {
    this._props.$editor.removeClass("dx-texteditor-with-floating-label").removeClass("dx-texteditor-with-label");
    if (e) {
      var t = this._props.mode === "floating" ? "dx-texteditor-with-floating-label" : "dx-texteditor-with-label";
      this._props.$editor.addClass(t);
    }
  };
  t._updateEditorBeforeButtonsClass = function (e = this._isVisible()) {
    this._props.$editor.removeClass("dx-texteditor-with-before-buttons");
    if (e) {
      var t = this._props.containsButtonsBefore ? "dx-texteditor-with-before-buttons" : "";
      this._props.$editor.addClass(t);
    }
  };
  t._updateMark = function () {
    this._$labelSpan.attr("data-mark", this._props.mark);
  };
  t._updateText = function () {
    this._$labelSpan.text(this._props.text);
  };
  t._updateBeforeWidth = function () {
    this._$before.css({
      width: this._props.beforeWidth
    });
  };
  t._updateMaxWidth = function () {
    this._$label.css({
      maxWidth: this._props.containerWidth
    });
  };
  t.$element = function () {
    return this._$root;
  };
  t.isVisible = function () {
    return this._isVisible();
  };
  t.getId = function () {
    if (this._isVisible()) {
      return this._id;
    }
  };
  t.updateMode = function (e) {
    this._props.mode = e;
    this._toggleMarkupVisibility();
  };
  t.updateText = function (e) {
    this._props.text = e;
    this._updateText();
    this._toggleMarkupVisibility();
  };
  t.updateMark = function (e) {
    this._props.mark = e;
    this._updateMark();
  };
  t.updateContainsButtonsBefore = function (e) {
    this._props.containsButtonsBefore = e;
    this._updateEditorBeforeButtonsClass();
  };
  t.updateBeforeWidth = function (e) {
    this._props.beforeWidth = e;
    this._updateBeforeWidth();
  };
  t.updateMaxWidth = function (e) {
    this._props.containerWidth = e;
    this._updateMaxWidth();
  };
  return e;
}();
exports.TextEditorLabel = r;