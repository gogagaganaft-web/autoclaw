exports.default = undefined;
var i = require("./58664.js");
var o = A(require("./68374.js"));
var a = A(require("./73176.js"));
var r = A(require("./99393.js"));
var s = require("./20576.js");
var l = require("./35922.js");
var u = require("./60810.js");
var d = require("./13306.js");
var c = A(require("./63008.js"));
var h = A(require("./96452.js"));
var f = A(require("./66894.js"));
var p = A(require("./69221.js"));
var g = A(require("./92633.js"));
var m = require("./31648.js");
var _ = A(require("./91198.js"));
var v = A(require("./69434.js"));
var y = A(require("./20530.js"));
var b = A(require("./87209.js"));
var x = require("./58201.js");
var w = A(require("./28109.js"));
var C = A(require("./91500.js"));
var S = require("./68494.js");
var k = require("./39611.js");
var D = A(require("./19769.js"));
var I = A(require("./76095.js"));
var T = A(require("./76276.js"));
var E = require("./24028.js");
var O = A(require("./55994.js"));
function A(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function P() {
  return (P = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var M = (0, k.addNamespace)(E.end, "dxCalendar");
var R = {
  month: 3,
  year: 2,
  decade: 1,
  century: 0
};
var B = "month";
var L = "year";
var V = "decade";
var F = "century";
var H = {
  SingleSelection: D.default,
  MultiSelection: I.default,
  RangeSelection: T.default
};
var N = h.default.inherit({
  _activeStateUnit: ".dx-calendar-cell",
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      currentDate: new Date(),
      value: null,
      values: [],
      dateSerializationFormat: undefined,
      min: new Date(1000, 0),
      max: new Date(3000, 0),
      firstDayOfWeek: undefined,
      viewsCount: 1,
      zoomLevel: B,
      maxZoomLevel: B,
      minZoomLevel: F,
      selectionMode: "single",
      showTodayButton: false,
      showWeekNumbers: false,
      weekNumberRule: "auto",
      cellTemplate: "cell",
      disabledDates: null,
      onCellClick: null,
      onContouredChanged: null,
      skipFocusCheck: false,
      _todayDate: function () {
        return new Date();
      }
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return y.default.real().deviceType === "desktop" && !y.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _supportedKeys: function () {
    return (0, d.extend)(this.callBase(), {
      rightArrow: function (e) {
        e.preventDefault();
        if ((0, k.isCommandKeyPressed)(e)) {
          this._waitRenderView(1);
        } else {
          this._moveCurrentDateByOffset(this._getRtlCorrection() * 1);
        }
      },
      leftArrow: function (e) {
        e.preventDefault();
        if ((0, k.isCommandKeyPressed)(e)) {
          this._waitRenderView(-1);
        } else {
          this._moveCurrentDateByOffset(this._getRtlCorrection() * -1);
        }
      },
      upArrow: function (e) {
        e.preventDefault();
        if ((0, k.isCommandKeyPressed)(e)) {
          this._navigateUp();
        } else {
          if (b.default.isAnimating(this._view.$element())) {
            return;
          }
          this._moveCurrentDateByOffset(this._view.option("colCount") * -1);
        }
      },
      downArrow: function (e) {
        e.preventDefault();
        if ((0, k.isCommandKeyPressed)(e)) {
          this._navigateDown();
        } else {
          if (b.default.isAnimating(this._view.$element())) {
            return;
          }
          this._moveCurrentDateByOffset(this._view.option("colCount") * 1);
        }
      },
      home: function (e) {
        e.preventDefault();
        var t = this.option("zoomLevel");
        var n = this.option("currentDate");
        var i = this._dateOption("min");
        if (!this._view.isDateDisabled(n)) {
          var o = _.default.sameView(t, n, i) ? i : _.default.getViewFirstCellDate(t, n);
          this._moveToClosestAvailableDate(o);
        }
      },
      end: function (e) {
        e.preventDefault();
        var t = this.option("zoomLevel");
        var n = this.option("currentDate");
        var i = this._dateOption("max");
        if (!this._view.isDateDisabled(n)) {
          var o = _.default.sameView(t, n, i) ? i : _.default.getViewLastCellDate(t, n);
          this._moveToClosestAvailableDate(o);
        }
      },
      pageUp: function (e) {
        e.preventDefault();
        this._waitRenderView(this._getRtlCorrection() * -1);
      },
      pageDown: function (e) {
        e.preventDefault();
        this._waitRenderView(this._getRtlCorrection() * 1);
      },
      tab: s.noop,
      enter: this._enterKeyHandler
    });
  },
  _enterKeyHandler: function (e) {
    if (this._isMaxZoomLevel()) {
      if (!this._view.isDateDisabled(this.option("currentDate"))) {
        var t = this._updateTimeComponent(this.option("currentDate"));
        this._selectionStrategy.selectValue(t, e);
      }
    } else {
      this._navigateDown();
    }
  },
  _getSerializationFormat: function (e) {
    var t = this.option(e || "value");
    if (this.option("dateSerializationFormat")) {
      return this.option("dateSerializationFormat");
    } else if ((0, l.isNumeric)(t)) {
      return "number";
    } else if ((0, l.isString)(t)) {
      return v.default.getDateSerializationFormat(t);
    } else {
      return undefined;
    }
  },
  _convertToDate: function (e) {
    return v.default.deserializeDate(e);
  },
  _dateValue: function (e, t) {
    var n = Array.isArray(e) ? "values" : "value";
    if (t) {
      if (t.type === "keydown") {
        var i = this._view._getContouredCell().get(0);
        t.target = i;
      }
      this._saveValueChangeEvent(t);
    }
    this._dateOption(n, e);
  },
  _dateOption: function (e, t) {
    var n = this;
    if (arguments.length === 1) {
      var o = this.option("values") ?? [];
      if (e === "values") {
        return o.map(function (e) {
          return n._convertToDate(e);
        });
      } else {
        return this._convertToDate(this.option(e));
      }
    }
    var a = this._getSerializationFormat(e);
    var r = e === "values" ? (t == null ? undefined : t.map(function (e) {
      return v.default.serializeDate(e, a);
    })) || [] : v.default.serializeDate(t, a);
    this.option(e, r);
  },
  _shiftDate: function (e, t, n, i) {
    switch (e) {
      case B:
        t.setDate(t.getDate() + n * i);
        break;
      case L:
        t.setMonth(t.getMonth() + n * i);
        break;
      case V:
        t.setFullYear(t.getFullYear() + n * i);
        break;
      case F:
        t.setFullYear(t.getFullYear() + n * 10 * i);
    }
  },
  _moveCurrentDateByOffset: function (e) {
    var t = this.option("currentDate");
    var n = new Date(t);
    var i = this.option("zoomLevel");
    this._shiftDate(i, n, e, 1);
    var o = this._getMaxDate();
    var a = this._getMinDate();
    var r = this._areDatesInNeighborView(i, n, t);
    for (var s = (0, u.inRange)(n, a, o) && r, l = new Date(n); s;) {
      if (!this._view.isDateDisabled(l)) {
        n = l;
        break;
      }
      this._shiftDate(i, l, e, 1);
      r = this._areDatesInNeighborView(i, l, t);
      s = (0, u.inRange)(l, a, o) && r;
    }
    if (this._view.isDateDisabled(t) || this._view.isDateDisabled(n)) {
      this._waitRenderView(e > 0 ? 1 : -1);
    } else {
      this._skipNavigate = true;
      this.option("currentDate", n);
    }
  },
  _areDatesInSameView: function (e, t, n) {
    switch (e) {
      case B:
        return t.getMonth() === n.getMonth();
      case L:
        return t.getYear() === n.getYear();
      case V:
        return parseInt(t.getYear() / 10) === parseInt(n.getYear() / 10);
      case F:
        return parseInt(t.getYear() / 100) === parseInt(n.getYear() / 100);
    }
  },
  _areDatesInNeighborView: function (e, t, n) {
    var i;
    var o;
    var a;
    switch (e) {
      case B:
        i = t.getMonth();
        o = n.getMonth();
        a = Math.abs(i - o);
        return Math.min(a, 12 - a) <= 1;
      case L:
        return Math.abs(t.getYear() - n.getYear()) <= 1;
      case V:
        return Math.abs(t.getYear() - n.getYear()) <= 10;
      case F:
        return Math.abs(t.getYear() - n.getYear()) <= 100;
    }
  },
  _moveToClosestAvailableDate: function () {
    var e;
    var t;
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option("currentDate");
    var i = new Date(n);
    var o = this.option("zoomLevel");
    var a = !this._isDateNotAvailable(i);
    var r = a;
    var s = a;
    var l = new Date(i);
    var u = new Date(i);
    do {
      if (r) {
        i = l;
        break;
      }
      if (s) {
        i = u;
        break;
      }
      this._shiftDate(o, l, 1, 1);
      this._shiftDate(o, u, 1, -1);
      e = this._areDatesInSameView(o, l, n);
      t = this._areDatesInSameView(o, u, n);
      r = e && !this._isDateNotAvailable(l);
      s = t && !this._isDateNotAvailable(u);
    } while (e || t);
    this.option("currentDate", i);
  },
  _isDateNotAvailable: function (e) {
    var t = this._getMaxDate();
    var n = this._getMinDate();
    return !(0, u.inRange)(e, n, t) || this._view.isDateDisabled(e);
  },
  _init: function () {
    this.callBase();
    this._initSelectionStrategy();
    this._correctZoomLevel();
    this._initCurrentDate();
    this._initActions();
  },
  _initSelectionStrategy: function () {
    var e = this._getSelectionStrategyName();
    var t = H[e];
    if (!this._selectionStrategy || this._selectionStrategy.NAME !== e) {
      this._selectionStrategy = new t(this);
    }
  },
  _refreshSelectionStrategy: function () {
    this._initSelectionStrategy();
    this._refresh();
  },
  _getSelectionStrategyName: function () {
    switch (this.option("selectionMode")) {
      case "multi":
        return "MultiSelection";
      case "range":
        return "RangeSelection";
      default:
        return "SingleSelection";
    }
  },
  _correctZoomLevel: function () {
    var e = this.option("minZoomLevel");
    var t = this.option("maxZoomLevel");
    var n = this.option("zoomLevel");
    if (!(R[t] < R[e])) {
      if (R[n] > R[t]) {
        this.option("zoomLevel", t);
      } else if (R[n] < R[e]) {
        this.option("zoomLevel", e);
      }
    }
  },
  _initCurrentDate: function () {
    var t = this._getNormalizedDate(this._selectionStrategy.getDefaultCurrentDate()) ?? this._getNormalizedDate(this.option("currentDate"));
    this.option("currentDate", t);
  },
  _getNormalizedDate: function (e) {
    e = _.default.normalizeDate(e, this._getMinDate(), this._getMaxDate());
    if ((0, l.isDefined)(e)) {
      return this._getDate(e);
    } else {
      return e;
    }
  },
  _initActions: function () {
    this._cellClickAction = this._createActionByOption("onCellClick");
    this._onContouredChanged = this._createActionByOption("onContouredChanged");
  },
  _initTemplates: function () {
    this._templateManager.addDefaultTemplates({
      cell: new S.FunctionTemplate(function (e) {
        var t = e.model;
        (0, o.default)(e.container).append((0, o.default)("<span>").text(t && t.text || String(t)));
      })
    });
    this.callBase();
  },
  _updateCurrentDate: function (e) {
    if (b.default.isAnimating(this._$viewsWrapper)) {
      b.default.stop(this._$viewsWrapper, true);
    }
    if (this._getMinDate() > this._getMaxDate()) {
      this.option("currentDate", new Date());
    } else {
      var t = this._getNormalizedDate(e);
      if (e.getTime() === t.getTime()) {
        var n = this._getViewsOffset(this._view.option("date"), t);
        if (n !== 0 && !this._isMaxZoomLevel() && this._isOtherViewCellClicked) {
          n = 0;
        }
        if (this._view && n !== 0 && !this._suppressNavigation) {
          if (this._additionalView) {
            if (n > 2 || n < -1) {
              this._refreshViews();
              this._setViewContoured(t);
              this._updateAriaId(t);
              this._renderNavigator();
            } else if (n === 1 && this._skipNavigate) {
              this._setViewContoured(t);
              this._updateAriaId(t);
            } else {
              this._navigate(n, t);
            }
          } else {
            this._navigate(n, t);
          }
        } else {
          this._renderNavigator();
          this._setViewContoured(t);
          this._updateAriaId(t);
        }
        this._skipNavigate = false;
      } else {
        this.option("currentDate", new Date(t));
      }
    }
  },
  _isAdditionalViewDate: function (e) {
    return !!this._additionalView && e >= this._additionalView._getFirstAvailableDate();
  },
  _getActiveView: function (e) {
    if (this._isAdditionalViewDate(e)) {
      return this._additionalView;
    } else {
      return this._view;
    }
  },
  _setViewContoured: function (e) {
    var t;
    if (this.option("skipFocusCheck") || this._focusTarget().hasClass("dx-state-focused")) {
      this._view.option("contouredDate", null);
      if ((t = this._additionalView) !== null && t !== undefined) {
        t.option("contouredDate", null);
      }
      (this._isAdditionalViewDate(e) ? this._additionalView : this._view).option("contouredDate", e);
    }
  },
  _getMinDate: function () {
    var e = this.option("_rangeMin");
    return e || (this.min ||= this._dateOption("min") || new Date(1000, 0), this.min);
  },
  _getMaxDate: function () {
    var e = this.option("_rangeMax");
    return e || (this.max ||= this._dateOption("max") || new Date(3000, 0), this.max);
  },
  _getViewsOffset: function (e, t) {
    var n;
    var i = this.option("zoomLevel");
    if (i === B) {
      return this._getMonthsOffset(e, t);
    }
    switch (i) {
      case F:
        n = 100;
        break;
      case V:
        n = 10;
        break;
      default:
        n = 1;
    }
    return parseInt(t.getFullYear() / n) - parseInt(e.getFullYear() / n);
  },
  _getMonthsOffset: function (e, t) {
    return (t.getFullYear() - e.getFullYear()) * 12 + (t.getMonth() - e.getMonth());
  },
  _waitRenderView: function (e) {
    var t = this;
    if (!this._alreadyViewRender) {
      this._alreadyViewRender = true;
      var n = this._getDateByOffset(e * this._getRtlCorrection());
      this._moveToClosestAvailableDate(n);
      this._waitRenderViewTimeout = setTimeout(function () {
        t._alreadyViewRender = false;
      });
    }
  },
  _getRtlCorrection: function () {
    if (this.option("rtlEnabled")) {
      return -1;
    } else {
      return 1;
    }
  },
  _getDateByOffset: function (e, t) {
    var i = (t = this._getDate(t ?? this.option("currentDate"))).getDate();
    var o = _.default.getDifferenceInMonth(this.option("zoomLevel")) * e;
    t.setDate(1);
    t.setMonth(t.getMonth() + o);
    var a = _.default.getLastMonthDate(t).getDate();
    t.setDate(i > a ? a : i);
    return t;
  },
  _focusTarget: function () {
    return this.$element();
  },
  _initMarkup: function () {
    this._renderSubmitElement();
    this.callBase();
    var e = this.$element();
    e.addClass("dx-calendar");
    e.toggleClass("dx-calendar-range", this.option("selectionMode") === "range");
    this._renderBody();
    e.append(this.$body);
    this._renderViews();
    this._renderEvents();
    this._renderNavigator();
    e.prepend(this._navigator.$element());
    this._renderSwipeable();
    this._renderFooter();
    this._selectionStrategy.updateAriaSelected();
    this._updateAriaId();
    this.setAria("role", "application");
    this._moveToClosestAvailableDate();
  },
  _render: function () {
    this.callBase();
    this._setViewContoured(this.option("currentDate"));
  },
  _renderBody: function () {
    if (!this._$viewsWrapper) {
      this.$body = (0, o.default)("<div>").addClass("dx-calendar-body");
      this._$viewsWrapper = (0, o.default)("<div>").addClass("dx-calendar-views-wrapper");
      this.$body.append(this._$viewsWrapper);
    }
  },
  _getKeyboardListeners: function () {
    return this.callBase().concat([this._view]);
  },
  _renderViews: function () {
    this.$element().addClass("dx-calendar-view-" + this.option("zoomLevel"));
    var e = this.option();
    var t = e.currentDate;
    var n = e.viewsCount;
    this.$element().toggleClass("dx-calendar-multiview", n > 1);
    this._view = this._renderSpecificView(t);
    if ((0, x.hasWindow)()) {
      var i = this._getDateByOffset(-1, t);
      this._beforeView = this._isViewAvailable(i) ? this._renderSpecificView(i) : null;
      var o = this._getDateByOffset(n, t);
      o.setDate(1);
      this._afterView = this._isViewAvailable(o) ? this._renderSpecificView(o) : null;
    }
    if (n > 1) {
      this._additionalView = this._renderSpecificView(this._getDateByOffset(1, t));
    }
    this._translateViews();
  },
  _renderSpecificView: function (e) {
    var t = this.option().zoomLevel;
    var n = g.default[t];
    var i = (0, o.default)("<div>").appendTo(this._$viewsWrapper);
    var a = this._viewConfig(e);
    return this._createComponent(i, n, a);
  },
  _viewConfig: function (e) {
    var n = this.option("disabledDates");
    n = (0, l.isFunction)(n) ? this._injectComponent(n.bind(this)) : n;
    return P({}, this._selectionStrategy.getViewOptions(), {
      date: e,
      min: this._getMinDate(),
      max: this._getMaxDate(),
      firstDayOfWeek: this.option("firstDayOfWeek") ?? C.default.firstDayOfWeekIndex(),
      showWeekNumbers: this.option("showWeekNumbers"),
      weekNumberRule: this.option("weekNumberRule"),
      zoomLevel: this.option("zoomLevel"),
      tabIndex: undefined,
      focusStateEnabled: this.option("focusStateEnabled"),
      hoverStateEnabled: this.option("hoverStateEnabled"),
      disabledDates: n,
      onCellClick: this._cellClickHandler.bind(this),
      cellTemplate: this._getTemplateByOption("cellTemplate"),
      allowValueSelection: this._isMaxZoomLevel(),
      _todayDate: this.option("_todayDate")
    });
  },
  _renderEvents: function () {
    var e = this;
    O.default.off(this._$viewsWrapper, M);
    if (this.option("selectionMode") === "range") {
      O.default.on(this._$viewsWrapper, M, null, function (t) {
        e._updateViewsOption("hoveredRange", []);
      });
    }
  },
  _injectComponent: function (e) {
    var t = this;
    return function (n) {
      (0, d.extend)(n, {
        component: t
      });
      return e(n);
    };
  },
  _isViewAvailable: function (e) {
    var t = this.option("zoomLevel");
    var n = _.default.getViewMinBoundaryDate(t, this._getMinDate());
    var i = _.default.getViewMaxBoundaryDate(t, this._getMaxDate());
    return _.default.dateInRange(e, n, i);
  },
  _translateViews: function () {
    var e = this.option().viewsCount;
    (0, m.move)(this._view.$element(), {
      left: 0,
      top: 0
    });
    this._moveViewElement(this._beforeView, -1);
    this._moveViewElement(this._afterView, e);
    this._moveViewElement(this._additionalView, 1);
  },
  _moveViewElement: function (e, t) {
    if (e) {
      (0, m.move)(e.$element(), {
        left: this._getViewPosition(t),
        top: 0
      });
    }
  },
  _getViewPosition: function (e) {
    return e * 100 * (this.option("rtlEnabled") ? -1 : 1) + "%";
  },
  _cellClickHandler: function (e) {
    var t = this.option("zoomLevel");
    var n = _.default.getViewDown(t);
    var i = this._isMaxZoomLevel();
    if (n && !i) {
      this._navigateDown(e.event.currentTarget);
    } else {
      var o = this._updateTimeComponent(e.value);
      this._selectionStrategy.selectValue(o, e.event);
      this._cellClickAction(e);
    }
  },
  _updateTimeComponent: function (e) {
    var t = new Date(e);
    var n = this._dateOption("value");
    if (n) {
      t.setHours(n.getHours());
      t.setMinutes(n.getMinutes());
      t.setSeconds(n.getSeconds());
      t.setMilliseconds(n.getMilliseconds());
    }
    return t;
  },
  _isMaxZoomLevel: function () {
    return this.option("zoomLevel") === this.option("maxZoomLevel");
  },
  _navigateDown: function (e) {
    var t = this.option("zoomLevel");
    if (!this._isMaxZoomLevel()) {
      var n = _.default.getViewDown(t);
      if (n) {
        var i = this._view.option("contouredDate") || this._view.option("date");
        if (e) {
          i = (0, o.default)(e).data("dxDateValueKey");
        }
        this._isOtherViewCellClicked = true;
        this.option("currentDate", i);
        this.option("zoomLevel", n);
        this._isOtherViewCellClicked = false;
        this._renderNavigator();
        this._animateShowView();
        this._moveToClosestAvailableDate();
        this._setViewContoured(this._getNormalizedDate(this.option("currentDate")));
      }
    }
  },
  _renderNavigator: function () {
    this._navigator ||= new p.default((0, o.default)("<div>"), this._navigatorConfig());
    this._navigator.option("text", this._getViewsCaption(this._view, this._additionalView));
    this._updateButtonsVisibility();
  },
  _navigatorConfig: function () {
    var e = this.option().rtlEnabled;
    return {
      text: this._getViewsCaption(this._view, this._additionalView),
      onClick: this._navigatorClickHandler.bind(this),
      onCaptionClick: this._navigateUp.bind(this),
      rtlEnabled: e
    };
  },
  _navigatorClickHandler: function (e) {
    var t = this.option();
    var n = t.currentDate;
    var i = t.viewsCount;
    var o = e.direction;
    if (i > 1) {
      var a = this._isAdditionalViewDate(n);
      if (a && o < 0 || !a && o > 0) {
        o *= 2;
      }
    }
    var r = this._getDateByOffset(o, n);
    this._moveToClosestAvailableDate(r);
  },
  _navigateUp: function () {
    var e = this.option("zoomLevel");
    var t = _.default.getViewUp(e);
    if (t && !this._isMinZoomLevel(e)) {
      this.option("zoomLevel", t);
      this._renderNavigator();
      this._animateShowView();
      this._moveToClosestAvailableDate();
      this._setViewContoured(this._getNormalizedDate(this.option("currentDate")));
    }
  },
  _isMinZoomLevel: function (e) {
    var t = this._getMinDate();
    var n = this._getMaxDate();
    return _.default.sameView(e, t, n) || this.option("minZoomLevel") === e;
  },
  _updateButtonsVisibility: function () {
    this._navigator.toggleButton("next", !(0, l.isDefined)(this._afterView));
    this._navigator.toggleButton("prev", !(0, l.isDefined)(this._beforeView));
  },
  _renderSwipeable: function () {
    this._swipeable ||= this._createComponent(this.$element(), f.default, {
      onStart: this._swipeStartHandler.bind(this),
      onUpdated: this._swipeUpdateHandler.bind(this),
      onEnd: this._swipeEndHandler.bind(this),
      itemSizeFunc: this._viewWidth.bind(this)
    });
  },
  _swipeStartHandler: function (e) {
    b.default.stop(this._$viewsWrapper, true);
    var t = this.option().viewsCount;
    this._toggleGestureCoverCursor("grabbing");
    e.event.maxLeftOffset = this._getRequiredView("next") ? 1 / t : 0;
    e.event.maxRightOffset = this._getRequiredView("prev") ? 1 / t : 0;
  },
  _toggleGestureCoverCursor: function (e) {
    (0, o.default)(`.dx-gesture-cover`).css("cursor", e);
  },
  _getRequiredView: function (e) {
    var t;
    var n = this.option("rtlEnabled");
    if (e === "next") {
      t = n ? this._beforeView : this._afterView;
    } else if (e === "prev") {
      t = n ? this._afterView : this._beforeView;
    }
    return t;
  },
  _swipeUpdateHandler: function (e) {
    var t = e.event.offset;
    (0, m.move)(this._$viewsWrapper, {
      left: t * this._viewWidth(),
      top: 0
    });
    this._updateNavigatorCaption(t);
  },
  _swipeEndHandler: function (e) {
    this._toggleGestureCoverCursor("auto");
    var t = this.option();
    var n = t.currentDate;
    var i = t.rtlEnabled;
    var o = e.event.targetOffset;
    var a = o ? o / Math.abs(o) : 0;
    var r = this._isAdditionalViewDate(n) && (i ? a === -1 : a === 1);
    if (a !== 0) {
      var s = -a * this._getRtlCorrection() * (r ? 2 : 1);
      var l = this._getDateByOffset(s);
      if (this._isDateInInvalidRange(l)) {
        l = a >= 0 ? new Date(this._getMinDate()) : new Date(this._getMaxDate());
      }
      this.option("currentDate", l);
    } else {
      this._animateWrapper(0, 250);
    }
  },
  _viewWidth: function () {
    this._viewWidthValue ||= (0, i.getWidth)(this.$element()) / this.option("viewsCount");
    return this._viewWidthValue;
  },
  _updateNavigatorCaption: function (e) {
    e *= this._getRtlCorrection();
    var t;
    var n;
    var i = this.option("viewsCount") > 1;
    if (e > 0.5 && this._beforeView) {
      t = this._beforeView;
      n = i && this._view;
    } else if (e < -0.5 && this._afterView) {
      t = i ? this._additionalView : this._afterView;
      n = i ? this._afterView : null;
    } else {
      t = this._view;
      n = i ? this._additionalView : null;
    }
    this._navigator.option("text", this._getViewsCaption(t, n));
  },
  _getViewsCaption: function (e, t) {
    var n = e.getNavigatorCaption();
    if (this.option().viewsCount > 1 && t) {
      var i = t.getNavigatorCaption();
      n = `${n} - ${i}`;
    }
    return n;
  },
  _isDateInInvalidRange: function (e) {
    if (!this._view.isBoundary(e)) {
      var t = this._getMinDate();
      var n = this._getMaxDate();
      var i = _.default.normalizeDate(e, t, n);
      return i === t || i === n;
    }
  },
  _renderFooter: function () {
    var e = this;
    var t = this.option("showTodayButton");
    if (t) {
      var n = this._createComponent((0, o.default)("<div>"), c.default, {
        focusStateEnabled: this.option("focusStateEnabled"),
        text: w.default.format("dxCalendar-todayButtonText"),
        onClick: function (t) {
          e._toTodayView(t);
        },
        type: "default",
        stylingMode: "text",
        integrationOptions: {}
      }).$element().addClass("dx-calendar-today-button");
      this._$footer = (0, o.default)("<div>").addClass("dx-calendar-footer").append(n);
      this.$element().append(this._$footer);
    }
    this.$element().toggleClass("dx-calendar-with-footer", t);
  },
  _renderSubmitElement: function () {
    this._$submitElement = (0, o.default)("<input>").attr("type", "hidden").appendTo(this.$element());
    this._setSubmitValue(this.option("value"));
  },
  _setSubmitValue: function (e) {
    var t = this._convertToDate(e);
    this._getSubmitElement().val(v.default.serializeDate(t, "yyyy-MM-dd"));
  },
  _getSubmitElement: function () {
    return this._$submitElement;
  },
  _animateShowView: function () {
    b.default.stop(this._view.$element(), true);
    this._popAnimationView(this._view, 0.6, 1, 250);
    if (this.option("viewsCount") > 1) {
      b.default.stop(this._additionalView.$element(), true);
      this._popAnimationView(this._additionalView, 0.6, 1, 250);
    }
  },
  _popAnimationView: function (e, t, n, i) {
    return b.default.animate(e.$element(), {
      type: "pop",
      from: {
        scale: t,
        opacity: t
      },
      to: {
        scale: n,
        opacity: n
      },
      duration: i
    });
  },
  _navigate: function (e, t) {
    if (e !== 0 && Math.abs(e) !== 1 && this._isViewAvailable(t)) {
      var n = this._renderSpecificView(t);
      if (e > 0) {
        if (this._afterView) {
          this._afterView.$element().remove();
        }
        this._afterView = n;
      } else {
        if (this._beforeView) {
          this._beforeView.$element().remove();
        }
        this._beforeView = n;
      }
      this._translateViews();
    }
    var i = -this._getRtlCorrection() * (e > 0 ? 1 : e < 0 ? -1 : 0) * this._viewWidth();
    if (this._$viewsWrapper.position().left !== i) {
      if (this._preventViewChangeAnimation) {
        this._wrapperAnimationEndHandler(e, t);
      } else {
        this._animateWrapper(i, 250).done(this._wrapperAnimationEndHandler.bind(this, e, t));
      }
    }
  },
  _animateWrapper: function (e, t) {
    return b.default.animate(this._$viewsWrapper, {
      type: "slide",
      from: {
        left: this._$viewsWrapper.position().left
      },
      to: {
        left: e
      },
      duration: t
    });
  },
  _getDate: function (e) {
    return new Date(e);
  },
  _toTodayView: function (e) {
    var t = new Date();
    if (this._isMaxZoomLevel()) {
      this._selectionStrategy.selectValue(t, e.event);
    } else {
      this._preventViewChangeAnimation = true;
      this.option("zoomLevel", this.option("maxZoomLevel"));
      this._selectionStrategy.selectValue(t, e.event);
      this._animateShowView();
      this._preventViewChangeAnimation = false;
    }
  },
  _wrapperAnimationEndHandler: function (e, t) {
    this._rearrangeViews(e);
    this._translateViews();
    this._resetLocation();
    this._renderNavigator();
    this._setViewContoured(t);
    this._updateAriaId(t);
    this._selectionStrategy.updateAriaSelected();
  },
  _rearrangeViews: function (e) {
    var t;
    if (e !== 0) {
      var n;
      var i;
      var o;
      var a;
      var r;
      var s = this.option().viewsCount;
      if (e < 0) {
        n = 1;
        i = "_beforeView";
        o = "_afterView";
        a = "_view";
        r = s === 1 ? "_view" : "_additionalView";
      } else {
        n = -1;
        i = "_afterView";
        o = "_beforeView";
        a = s === 1 ? "_view" : "_additionalView";
        r = "_view";
      }
      if (this[i]) {
        var l = this[i].option("date");
        if ((t = this[o]) !== null && t !== undefined) {
          t.$element().remove();
        }
        this[o] = this._renderSpecificView(this._getDateByOffset(n * s, l));
        this[r].$element().remove();
        if (s === 1) {
          this[r] = this[i];
        } else {
          this[r] = this[a];
          this[a] = this[i];
        }
        var u = this._getDateByOffset(-n, l);
        this[i] = this._isViewAvailable(u) ? this._renderSpecificView(u) : null;
      }
    }
  },
  _resetLocation: function () {
    (0, m.move)(this._$viewsWrapper, {
      left: 0,
      top: 0
    });
  },
  _clean: function () {
    this.callBase();
    this._clearViewWidthCache();
    delete this._$viewsWrapper;
    delete this._navigator;
    delete this._$footer;
  },
  _clearViewWidthCache: function () {
    delete this._viewWidthValue;
  },
  _disposeViews: function () {
    this._view.$element().remove();
    if (this._beforeView) {
      this._beforeView.$element().remove();
    }
    if (this._additionalView) {
      this._additionalView.$element().remove();
    }
    if (this._afterView) {
      this._afterView.$element().remove();
    }
    delete this._view;
    delete this._additionalView;
    delete this._beforeView;
    delete this._afterView;
    delete this._skipNavigate;
  },
  _dispose: function () {
    clearTimeout(this._waitRenderViewTimeout);
    this.callBase();
  },
  _refreshViews: function () {
    this._resetActiveState();
    this._disposeViews();
    this._renderViews();
  },
  _visibilityChanged: function () {
    this._translateViews();
  },
  _focusInHandler: function () {
    this.callBase.apply(this, arguments);
    this._setViewContoured(this.option("currentDate"));
  },
  _focusOutHandler: function () {
    var e;
    this.callBase.apply(this, arguments);
    this._view.option("contouredDate", null);
    if ((e = this._additionalView) !== null && e !== undefined) {
      e.option("contouredDate", null);
    }
  },
  _updateViewsOption: function (e, t) {
    var n;
    var i;
    var o;
    this._view.option(e, t);
    if ((n = this._additionalView) !== null && n !== undefined) {
      n.option(e, t);
    }
    if ((i = this._beforeView) !== null && i !== undefined) {
      i.option(e, t);
    }
    if ((o = this._afterView) !== null && o !== undefined) {
      o.option(e, t);
    }
  },
  _setViewsMinOption: function (e) {
    this._restoreViewsMinMaxOptions();
    this.option("_rangeMin", this._convertToDate(e));
    this._updateViewsOption("min", this._getMinDate());
  },
  _setViewsMaxOption: function (e) {
    this._restoreViewsMinMaxOptions();
    this.option("_rangeMax", this._convertToDate(e));
    this._updateViewsOption("max", this._getMaxDate());
  },
  _restoreViewsMinMaxOptions: function () {
    this.option({
      _rangeMin: null,
      _rangeMax: null
    });
    this._updateViewsOption("min", this._getMinDate());
    this._updateViewsOption("max", this._getMaxDate());
  },
  _updateAriaSelected: function (e, t) {
    var n = this;
    t.forEach(function (e) {
      n.setAria("selected", undefined, n._view._getCellByDate(e));
    });
    e.forEach(function (e) {
      n.setAria("selected", true, n._view._getCellByDate(e));
    });
    if (this.option("viewsCount") > 1) {
      t.forEach(function (e) {
        n.setAria("selected", undefined, n._additionalView._getCellByDate(e));
      });
      e.forEach(function (e) {
        n.setAria("selected", true, n._additionalView._getCellByDate(e));
      });
    }
  },
  _updateAriaId: function (e) {
    e = e ?? this.option("currentDate");
    var n = "dx-" + new a.default();
    var i = this._getActiveView(e)._getCellByDate(e);
    this.setAria("id", n, i);
    this.setAria("activedescendant", n);
    this._onContouredChanged(n);
  },
  _suppressingNavigation: function (e, t) {
    this._suppressNavigation = true;
    e.apply(this, t);
    delete this._suppressNavigation;
  },
  _optionChanged: function (e) {
    var t = e.value;
    var n = e.previousValue;
    switch (e.name) {
      case "width":
        this.callBase(e);
        this._clearViewWidthCache();
        break;
      case "min":
      case "max":
        this.min = undefined;
        this.max = undefined;
        this._suppressingNavigation(this._updateCurrentDate, [this.option("currentDate")]);
        this._refreshViews();
        this._renderNavigator();
        break;
      case "selectionMode":
        this._refreshSelectionStrategy();
        this._initCurrentDate();
        break;
      case "firstDayOfWeek":
        this._refreshViews();
        this._updateButtonsVisibility();
        break;
      case "currentDate":
        this.setAria("id", undefined, this._view._getCellByDate(n));
        this._updateCurrentDate(t);
        break;
      case "zoomLevel":
        this.$element().removeClass("dx-calendar-view-" + n);
        this._correctZoomLevel();
        this._refreshViews();
        this._renderNavigator();
        this._updateAriaId();
        break;
      case "minZoomLevel":
      case "maxZoomLevel":
        this._correctZoomLevel();
        this._updateButtonsVisibility();
        break;
      case "value":
        if (this.option("selectionMode") === "single") {
          this._selectionStrategy.processValueChanged([t], [n]);
        }
        this._setSubmitValue(t);
        this.callBase(e);
        break;
      case "values":
        if (this.option("selectionMode") !== "single") {
          this._selectionStrategy.processValueChanged(t, n);
        }
        this._raiseValueChangeAction(t, n);
        this._saveValueChangeEvent(undefined);
        break;
      case "viewsCount":
        this._refreshViews();
        this._renderNavigator();
        break;
      case "onCellClick":
        this._view.option("onCellClick", t);
        break;
      case "onContouredChanged":
        this._onContouredChanged = this._createActionByOption("onContouredChanged");
        break;
      case "disabledDates":
      case "dateSerializationFormat":
      case "cellTemplate":
      case "showTodayButton":
        this._invalidate();
        break;
      case "skipFocusCheck":
        break;
      case "_todayDate":
      case "showWeekNumbers":
      case "weekNumberRule":
        this._refreshViews();
        break;
      default:
        this.callBase(e);
    }
  },
  getContouredDate: function () {
    return this._view.option("contouredDate");
  }
});
(0, r.default)("dxCalendar", N);
var z = N;
exports.default = z;
module.exports = exports.default;
module.exports.default = exports.default;