exports.default = undefined;
var i = require("./58664.js");
var o = _(require("./68374.js"));
var a = _(require("./55994.js"));
var r = require("./35922.js");
var s = require("./39611.js");
var l = _(require("./55814.js"));
var u = require("./31648.js");
var d = require("./37518.js");
var c = _(require("./30963.js"));
var h = _(require("./42160.js"));
var f = require("./95479.js");
var p = require("./58201.js");
var g = require("./13306.js");
var m = require("./28822.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var y = {
  minColumnWidth: 40,
  minRowHeight: 24
};
var b = (0, s.addNamespace)("dxpointerdown", "dxHtmlTableResizingModule");
var x = (0, s.addNamespace)("scroll", "dxHtmlTableResizingModule");
var w = function (e) {
  var t;
  var n;
  function s(t, n) {
    var i;
    (i = e.call(this, t, n) || this).enabled = !!n.enabled;
    i._tableResizeFrames = [];
    i._minColumnWidth = i._minSizeLimit("minColumnWidth", n.minColumnWidth);
    i._minRowHeight = i._minSizeLimit("minRowHeight", n.minRowHeight);
    i._quillContainer = i.editorInstance._getQuillContainer();
    i._tableData = [];
    if (i.enabled) {
      i._applyResizing();
    }
    return i;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var c = s.prototype;
  c._applyResizing = function (e) {
    if (e) {
      this._applyResizingImpl();
    } else {
      this.editorInstance.addContentInitializedCallback(this._applyResizingImpl.bind(this));
    }
    this.addCleanCallback(this.clean.bind(this));
    this._resizeHandlerWithContext = l.default.add(this._resizeHandler.bind(this));
  };
  c._minSizeLimit = function (e, t) {
    if ((0, r.isDefined)(t)) {
      return Math.max(t, 0);
    } else {
      return y[e];
    }
  };
  c._applyResizingImpl = function () {
    var e = this._findTables();
    if (e.length) {
      this._fixTablesWidths(e);
      this._createResizeFrames(e);
      this._updateFramesPositions();
      this._updateFramesSeparators();
    }
    this._attachEvents();
  };
  c._attachEvents = function () {
    a.default.on(this.editorInstance._getContent(), x, this._updateFramesPositions.bind(this));
    this.quill.on("text-change", this._getQuillTextChangeHandler());
  };
  c._detachEvents = function () {
    a.default.off(this.editorInstance._getContent(), "dxHtmlTableResizingModule");
    this.quill.off("text-change", this._quillTextChangeHandler);
  };
  c._getQuillTextChangeHandler = function (e, t, n) {
    var i = this;
    return function (e, t, n) {
      if (i._isTableChanging()) {
        var o = i._findTables();
        i._removeResizeFrames();
        if (n === "api") {
          i._fixTablesWidths(o);
        }
        i._updateTablesColumnsWidth(o);
        i._createResizeFrames(o);
        i._updateFramesPositions();
        i._updateFramesSeparators();
      } else {
        i._updateFramesPositions();
        if (!i._isDragging) {
          i._updateFramesSeparators();
        }
      }
    };
  };
  c._getFrameForTable = function (e) {
    var t;
    if ((t = this._framesForTables) === null || t === undefined) {
      return undefined;
    } else {
      return t.get(e.get(0));
    }
  };
  c._resizeHandler = function () {
    var e = this;
    this._windowResizeTimeout = setTimeout(function () {
      var t = e._findTables();
      (0, f.each)(t, function (t, n) {
        var a = (0, o.default)(n);
        var r = e._tableResizeFrames[t];
        var s = (0, i.getOuterWidth)(a);
        var l = e._tableLastWidth(r);
        if (Math.abs(s - l) > 1) {
          e._tableLastWidth(r, s);
          e._updateColumnsWidth(a, t);
        }
      });
      e._updateFramesPositions();
      e._updateFramesSeparators();
    });
  };
  c._findTables = function () {
    return (0, o.default)(this._quillContainer).find("table");
  };
  c._getWidthStyleValue = function (e) {
    var t = e[0].style.width;
    if (t !== "") {
      return parseInt(t);
    } else {
      return undefined;
    }
  };
  c._tableLastWidth = function (e, t) {
    if (!(0, r.isDefined)(t)) {
      if (e == null) {
        return undefined;
      } else {
        return e.lastWidth;
      }
    }
    e.lastWidth = t;
  };
  c._fixTablesWidths = function (e) {
    var t = this;
    (0, f.each)(e, function (e, n) {
      var a = (0, o.default)(n);
      var r = t._getTableDeterminantElements(a, "horizontal");
      t._tableResizeFrames[e] ||= {
        lastWidth: undefined
      };
      var s = t._getFrameForTable(a);
      if (!s) {
        t._tableResizeFrames.push({
          $table: a
        });
      }
      if ((0, m.getAutoSizedElements)(a).length === 0) {
        var u = t._getColumnElementsSum(r).columnsSum;
        (0, m.unfixTableWidth)(a, {
          quill: t.quill
        });
        var d = t._tableLastWidth(s) ?? (0, i.getOuterWidth)(a);
        if (s) {
          t._tableLastWidth(s, Math.max(u, d));
        }
      }
    });
  };
  c._createResizeFrames = function (e) {
    var t = this;
    this._framesForTables = new Map();
    e.each(function (e, n) {
      var a = (0, o.default)(n);
      var r = t._tableResizeFrames[e]?.$table;
      var s = t._tableResizeFrames[e].lastWidth;
      t._tableResizeFrames[e] = {
        $frame: t._createTableResizeFrame(n),
        $table: a,
        index: e,
        lastWidth: r && n === r.get(0) ? s : undefined,
        columnsCount: t._getTableDeterminantElements(a, "horizontal").length,
        rowsCount: t._getTableDeterminantElements(a, "vertical").length
      };
      t._framesForTables.set(n, t._tableResizeFrames[e]);
    });
    this._tableResizeFrames.length = e.length;
  };
  c._isTableChanging = function () {
    var e = this;
    var t = this._findTables();
    var n = false;
    if (t.length !== this._tableResizeFrames.length) {
      n = true;
    } else {
      (0, f.each)(t, function (t, i) {
        var a = (0, o.default)(i);
        var r = e._tableResizeFrames[t];
        var s = (r == null ? undefined : r.columnsCount) !== e._getTableDeterminantElements(a, "horizontal").length;
        var l = (r == null ? undefined : r.rowsCount) !== e._getTableDeterminantElements(a, "vertical").length;
        if (s || l) {
          n = true;
          return false;
        }
      });
    }
    return n;
  };
  c._removeResizeFrames = function (e) {
    var t;
    var n = this;
    (0, f.each)(this._tableResizeFrames, function (e, t) {
      if (t.$frame) {
        var i;
        var o = `.dx-htmleditor-column-resizer, .dx-htmleditor-row-resizer`;
        n._detachSeparatorEvents((i = t.$frame) === null || i === undefined ? undefined : i.find(o));
        t.$frame.remove();
      }
    });
    if ((t = this._framesForTables) !== null && t !== undefined) {
      t.clear();
    }
    if (e) {
      this._tableResizeFrames = [];
    }
  };
  c._detachSeparatorEvents = function (e) {
    e.each(function (e, t) {
      a.default.off(t, b);
    });
  };
  c._createTableResizeFrame = function () {
    return (0, o.default)("<div>").addClass("dx-table-resize-frame").appendTo(this._quillContainer);
  };
  c._updateFramesPositions = function () {
    var e = this;
    (0, f.each)(this._tableResizeFrames, function (t, n) {
      e._updateFramePosition(n.$table, n.$frame);
    });
  };
  c._updateFramePosition = function (e, t) {
    var n = (0, d.getBoundingRect)(e.get(0));
    var i = n.height;
    var o = n.width;
    var a = n.top;
    var r = n.left;
    var s = (0, d.getBoundingRect)(this.quill.root);
    var l = s.top;
    var c = s.left;
    t.css({
      height: i,
      width: o,
      top: a - l,
      left: r - c
    });
    (0, u.move)(t, {
      left: 0,
      top: 0
    });
  };
  c._updateFramesSeparators = function (e) {
    var t = this;
    (0, f.each)(this._tableResizeFrames, function (n, i) {
      if (e) {
        t._updateFrameSeparators(i, e);
      } else {
        t._updateFrameSeparators(i, "vertical");
        t._updateFrameSeparators(i, "horizontal");
      }
    });
  };
  c._isDraggable = function (e) {
    return e.hasClass("dx-draggable") && e.is(":visible");
  };
  c._removeDraggable = function (e, t) {
    if (this._isDraggable(e)) {
      (0, o.default)(e).dxDraggable("instance").dispose();
      (0, o.default)(e).addClass(t);
    }
  };
  c._getDirectionInfo = function (e) {
    if (e === "vertical") {
      return {
        lineResizerClass: "dx-htmleditor-row-resizer",
        sizeFunction: function (e) {
          return (0, i.getOuterHeight)(e);
        },
        positionCoordinate: "top",
        positionStyleProperty: "height",
        positionCoordinateName: "y"
      };
    } else {
      return {
        lineResizerClass: "dx-htmleditor-column-resizer",
        sizeFunction: function (e) {
          return (0, i.getOuterWidth)(e);
        },
        positionCoordinate: this.editorInstance.option("rtlEnabled") ? "right" : "left",
        positionStyleProperty: "width",
        positionCoordinateName: "x"
      };
    }
  };
  c._getSize = function (e, t) {
    return t.sizeFunction(e);
  };
  c._updateFrameSeparators = function (e, t) {
    var n = this._getTableDeterminantElements(e.$table, t);
    for (var i = n.length - 1, a = this._getDirectionInfo(t), s = e.$frame.find(`.${a.lineResizerClass}`), l = {
        transform: "none"
      }, u = 0, d = 0; d <= i; d++) {
      u += this._getSize(n.eq(d), a);
      if (!(0, r.isDefined)(s[d])) {
        s[d] = (0, o.default)("<div>").addClass(a.lineResizerClass).appendTo(e.$frame).get(0);
      }
      var c = (0, o.default)(s[d]);
      this._removeDraggable(c, a.lineResizerClass);
      l[a.positionCoordinate] = u - 2;
      (0, o.default)(c).css(l);
      var h = {
        lineSeparator: s[d],
        index: d,
        $determinantElements: n,
        frame: e,
        direction: t
      };
      this._attachColumnSeparatorEvents(h);
    }
  };
  c._getTableDeterminantElements = function (e, t) {
    if (t === "vertical") {
      return e.find("th:first-child, td:first-child");
    } else {
      return (0, m.getColumnElements)(e);
    }
  };
  c._attachColumnSeparatorEvents = function (e) {
    var t = this;
    a.default.on(e.lineSeparator, b, function () {
      t._createDraggableElement(e);
    });
  };
  c._dragStartHandler = function (e) {
    var t = e.$determinantElements;
    var n = e.index;
    var a = e.frame;
    var r = e.direction;
    var s = e.lineSeparator;
    var l = this._getDirectionInfo(r);
    this._isDragging = true;
    this._fixColumnsWidth(a.$table);
    this._startLineSize = parseInt(this._getSize((0, o.default)(t[n]), l));
    this._startTableWidth = (0, i.getOuterWidth)(a.$table);
    this._startLineSeparatorPosition = parseInt((0, o.default)(s).css(l.positionCoordinate));
    this._nextLineSize = 0;
    if (t[n + 1]) {
      this._nextLineSize = parseInt(this._getSize((0, o.default)(t[n + 1]), l));
    } else if (r === "horizontal") {
      (0, m.unfixTableWidth)(a.$table, {
        quill: this.quill
      });
    }
  };
  c._shouldRevertOffset = function (e) {
    return e === "horizontal" && this.editorInstance.option("rtlEnabled");
  };
  c._isNextColumnWidthEnough = function (e, t, n) {
    if (!this._nextLineSize) {
      return true;
    }
    if (e >= this._minColumnWidth) {
      var o = this._nextColumnOffsetLimit ? n < this._nextColumnOffsetLimit : n < 0;
      var a = Math.abs(this._getWidthStyleValue(t) - (0, i.getOuterWidth)(t)) > 3;
      return o || !a;
    }
    return false;
  };
  c._shouldSetNextColumnWidth = function (e) {
    return this._nextLineSize && e > 0;
  };
  c._horizontalDragHandler = function (e) {
    var t = e.currentLineNewSize;
    var n = e.directionInfo;
    var o = e.eventOffset;
    var a = e.$determinantElements;
    var r = e.index;
    var s = e.frame;
    var l = this._nextLineSize && this._nextLineSize - o;
    var u = t >= this._minColumnWidth;
    var d = (0, m.getLineElements)(s.$table, r);
    var c = (0, m.getLineElements)(s.$table, r + 1);
    var h = (0, i.getOuterWidth)(d.eq(0)) - t;
    if (u) {
      if (this._isNextColumnWidthEnough(l, a.eq(r + 1), o)) {
        (0, m.setLineElementsFormat)(this, {
          elements: d,
          property: n.positionStyleProperty,
          value: t
        });
        if (this._shouldSetNextColumnWidth(l)) {
          (0, m.setLineElementsFormat)(this, {
            elements: c,
            property: n.positionStyleProperty,
            value: l
          });
        }
        var f = Math.abs(this._startTableWidth - (0, i.getOuterWidth)(s.$table)) < 3;
        if (Math.abs(h) > 3 || !this._nextLineSize && f) {
          (0, m.setLineElementsFormat)(this, {
            elements: d,
            property: n.positionStyleProperty,
            value: (0, i.getOuterWidth)(d.eq(0))
          });
          l += t - (0, i.getOuterWidth)(d.eq(0));
          if (this._shouldSetNextColumnWidth(l)) {
            (0, m.setLineElementsFormat)(this, {
              elements: c,
              property: n.positionStyleProperty,
              value: l
            });
          }
        }
      } else {
        this._nextColumnOffsetLimit = this._nextColumnOffsetLimit || o;
      }
    }
    this._$highlightedElement.css(n.positionCoordinate, this._startLineSeparatorPosition + o + h + "px");
  };
  c._verticalDragHandler = function (e) {
    var t = e.currentLineNewSize;
    var n = e.directionInfo;
    var o = e.eventOffset;
    var a = e.$determinantElements;
    var r = e.index;
    var s = e.frame;
    var l = Math.max(t, this._minRowHeight);
    var u = (0, m.getLineElements)(s.$table, r, "vertical");
    (0, m.setLineElementsFormat)(this, {
      elements: u,
      property: n.positionStyleProperty,
      value: l
    });
    var d = (0, i.getOuterHeight)(a.eq(r)) - t;
    this._$highlightedElement.css(n.positionCoordinate, this._startLineSeparatorPosition + o + d + "px");
  };
  c._dragMoveHandler = function (e, t) {
    var n = t.$determinantElements;
    var i = t.index;
    var o = t.frame;
    var a = t.direction;
    var r = this._getDirectionInfo(a);
    var s = e.offset[r.positionCoordinateName];
    this.editorInstance._saveValueChangeEvent(e);
    if (this._shouldRevertOffset(a)) {
      s = -s;
    }
    var l = this._startLineSize + s;
    if (a === "horizontal") {
      this._horizontalDragHandler({
        currentLineNewSize: l,
        directionInfo: r,
        eventOffset: s,
        $determinantElements: n,
        index: i,
        frame: o
      });
    } else {
      this._verticalDragHandler({
        currentLineNewSize: l,
        directionInfo: r,
        eventOffset: s,
        $determinantElements: n,
        index: i,
        frame: o
      });
    }
    this._updateFramePosition(o.$table, o.$frame);
  };
  c._dragEndHandler = function (e) {
    var t;
    if ((t = this._$highlightedElement) !== null && t !== undefined) {
      t.remove();
    }
    this._isDragging = undefined;
    this._nextColumnOffsetLimit = undefined;
    this._tableLastWidth(e.frame, (0, i.getOuterWidth)(e.frame.$table));
    this._updateFramesPositions();
    this._updateFramesSeparators();
  };
  c._isLastColumnResizing = function (e) {
    var t = e.$determinantElements;
    var n = e.index;
    return !(0, r.isDefined)(t[n + 1]);
  };
  c._getBoundaryConfig = function (e) {
    var t = {};
    if (e.direction === "vertical") {
      t.boundary = e.frame.$table;
      t.boundOffset = {
        bottom: (0, p.hasWindow)() ? -(0, i.getHeight)((0, p.getWindow)()) : -(0, i.getOuterHeight)(this._quillContainer),
        top: 0,
        left: 0,
        right: 0
      };
    } else if (this._isLastColumnResizing(e)) {
      var n = this.editorInstance._getContent();
      t.boundary = n;
      t.boundOffset = {
        bottom: 0,
        top: 0,
        left: n.css("paddingLeft"),
        right: n.css("paddingRight")
      };
    } else {
      t.boundary = e.frame.$table;
    }
    return t;
  };
  c._createDraggableElement = function (e) {
    var t;
    var n = this;
    var i = this._getBoundaryConfig(e);
    var a = e.direction === "vertical" ? "dx-htmleditor-highlighted-row" : "dx-htmleditor-highlighted-column";
    if ((t = this._$highlightedElement) !== null && t !== undefined) {
      t.remove();
    }
    this._$highlightedElement = (0, o.default)("<div>").addClass(`${a}`).insertAfter((0, o.default)(e.lineSeparator));
    var r = {
      contentTemplate: null,
      allowMoveByClick: false,
      dragDirection: e.direction,
      onDragMove: function (t) {
        t.component;
        var i = t.event;
        n._dragMoveHandler(i, e);
      },
      onDragStart: function () {
        n._dragStartHandler(e);
      },
      onDragEnd: function () {
        n._dragEndHandler(e);
      }
    };
    (0, g.extend)(r, i);
    this._currentDraggableElement = this.editorInstance._createComponent(e.lineSeparator, h.default, r);
  };
  c._fixColumnsWidth = function (e) {
    var t = this;
    var n = this._getTableDeterminantElements(e);
    (0, f.each)(n, function (n, o) {
      var a = (0, i.getOuterWidth)(o);
      var r = (0, m.getLineElements)(e, n);
      (0, m.setLineElementsFormat)(t, {
        elements: r,
        property: "width",
        value: Math.max(a, t._minColumnWidth)
      });
    });
  };
  c._getColumnElementsSum = function (e) {
    var t = this;
    var n = [];
    var a = 0;
    (0, f.each)(e, function (e, r) {
      var s = (0, o.default)(r);
      var l = t._getWidthStyleValue(s) || (0, i.getOuterWidth)(s);
      n[e] = Math.max(l, t._minColumnWidth);
      a += n[e];
    });
    return {
      columnsWidths: n,
      columnsSum: a
    };
  };
  c._setColumnsRatioWidth = function (e, t, n, i) {
    var o = this;
    (0, f.each)(e, function (e) {
      var a;
      var r = (0, m.getLineElements)(i, e);
      a = t > 0 ? o._minColumnWidth + Math.round((n[e] - o._minColumnWidth) * t) : o._minColumnWidth;
      (0, m.setLineElementsFormat)(o, {
        elements: r,
        property: "width",
        value: a
      });
    });
  };
  c._updateColumnsWidth = function (e, t) {
    var n = this._getTableDeterminantElements(e);
    var o = this._tableResizeFrames[t];
    if (!o) {
      this._tableResizeFrames[t] = {};
    }
    o = this._tableResizeFrames[t];
    var a;
    var r = this._tableLastWidth(o) || (0, i.getOuterWidth)(e);
    var s = this._getColumnElementsSum(n);
    var l = s.columnsWidths;
    var u = s.columnsSum;
    var d = n.length * this._minColumnWidth;
    a = u > d ? (r - d) / (u - d) : -1;
    this._tableLastWidth(o, a > 0 ? r : d);
    this._setColumnsRatioWidth(n, a, l, e);
  };
  c._updateTablesColumnsWidth = function (e) {
    var t = this;
    (0, f.each)(e, function (e, n) {
      t._updateColumnsWidth((0, o.default)(n), e);
    });
  };
  c.option = function (e, t) {
    if (e !== "tableResizing") {
      if (e === "enabled") {
        this.enabled = t;
        if (t) {
          this._applyResizing(true);
        } else {
          this.clean();
        }
      } else if (["minColumnWidth", "minRowHeight"].includes(e)) {
        this[`_${e}`] = this._minSizeLimit(e, t);
      }
    } else {
      this.handleOptionChangeValue(t);
    }
  };
  c.clean = function () {
    this._removeResizeFrames(true);
    this._detachEvents();
    l.default.remove(this._resizeHandlerWithContext);
    clearTimeout(this._windowResizeTimeout);
    this._resizeHandlerWithContext = undefined;
    this._isDragging = undefined;
    this._startTableWidth = undefined;
    clearTimeout(this._attachResizerTimeout);
  };
  return s;
}(c.default);
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;