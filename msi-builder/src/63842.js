exports.default = undefined;
var i = require("./58664.js");
var o = g(require("./68374.js"));
var a = require("./13306.js");
var r = require("./58201.js");
var s = require("./62754.js");
var l = g(require("./28109.js"));
var u = g(require("./29837.js"));
var d = g(require("./76219.js"));
var c = g(require("./4741.js"));
var h = g(require("./94920.js"));
var f = require("./348.js");
var p = g(require("./99967.js"));
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var _ = function (e) {
  var t;
  var n;
  function p() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = p).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var g = p.prototype;
  g._init = function () {
    e.prototype._init.call(this);
    this._toolboxes = [];
    this._filterText = "";
    this._createOnShapeCategoryRenderedAction();
    this._createOnFilterChangedAction();
  };
  g._getPopupClass = function () {
    return "dx-diagram-toolbox-popup";
  };
  g._getPopupHeight = function () {
    if (this.isMobileView()) {
      return "100%";
    } else {
      return e.prototype._getPopupHeight.call(this);
    }
  };
  g._getPopupMaxHeight = function () {
    if (this.isMobileView()) {
      return "100%";
    } else {
      return e.prototype._getPopupMaxHeight.call(this);
    }
  };
  g._getPopupMinHeight = function () {
    return 130;
  };
  g._getPopupPosition = function () {
    var e = {
      my: "left top",
      at: "left top",
      of: this.option("offsetParent")
    };
    if (this.isMobileView()) {
      return e;
    } else {
      return (0, a.extend)(e, {
        offset: this.option("offsetX") + " " + this.option("offsetY")
      });
    }
  };
  g._getPopupAnimation = function () {
    var t = this.option("offsetParent");
    if (this.isMobileView()) {
      return {
        hide: this._getPopupSlideAnimationObject({
          direction: "left",
          from: {
            position: {
              my: "left top",
              at: "left top",
              of: t
            }
          },
          to: {
            position: {
              my: "right top",
              at: "left top",
              of: t
            }
          }
        }),
        show: this._getPopupSlideAnimationObject({
          direction: "right",
          from: {
            position: {
              my: "right top",
              at: "left top",
              of: t
            }
          },
          to: {
            position: {
              my: "left top",
              at: "left top",
              of: t
            }
          }
        })
      };
    } else {
      return e.prototype._getPopupAnimation.call(this);
    }
  };
  g._getPopupOptions = function () {
    var t = e.prototype._getPopupOptions.call(this);
    if (this.isMobileView()) {
      return t;
    } else {
      return (0, a.extend)(t, {
        showTitle: true,
        toolbarItems: [{
          widget: "dxButton",
          location: "center",
          options: {
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            icon: "diagram-toolbox-drag",
            stylingMode: "outlined",
            type: "normal"
          }
        }]
      });
    }
  };
  g._renderPopupContent = function (e) {
    var t = "100%";
    if (this.option("showSearch")) {
      var n = (0, o.default)("<div>").addClass("dx-diagram-toolbox-input-container").appendTo(e);
      this._updateElementWidth(n);
      this._renderSearchInput(n);
      if ((0, r.hasWindow)()) {
        t = "calc(100% - " + (0, i.getHeight)(this._searchInput.$element()) + "px)";
      }
    }
    var a = (0, o.default)("<div>").addClass("dx-diagram-toolbox-panel").appendTo(e);
    (0, i.setHeight)(a, t);
    this._updateElementWidth(a);
    this._renderScrollView(a);
  };
  g._updateElementWidth = function (e) {
    if (this.option("toolboxWidth") !== undefined) {
      e.css("width", this.option("toolboxWidth"));
    }
  };
  g.updateMaxHeight = function () {
    if (!this.isMobileView()) {
      var e = 6;
      if (this._popup) {
        var t = this._getPopupTitle();
        e += (0, i.getOuterHeight)(t);
      }
      if (this._accordion) {
        e += (0, i.getOuterHeight)(this._accordion.$element());
      }
      if (this._searchInput) {
        e += (0, i.getOuterHeight)(this._searchInput.$element());
      }
      this.option("maxHeight", e);
    }
  };
  g._renderSearchInput = function (e) {
    var t = this;
    var n = (0, o.default)("<div>").addClass("dx-diagram-toolbox-input").appendTo(e);
    this._searchInput = this._createComponent(n, u.default, {
      stylingMode: "outlined",
      placeholder: l.default.format("dxDiagram-uiSearch"),
      onValueChanged: function (e) {
        t._onInputChanged(e.value);
      },
      valueChangeEvent: "keyup",
      buttons: [{
        name: "search",
        location: "after",
        options: {
          activeStateEnabled: false,
          focusStateEnabled: false,
          hoverStateEnabled: false,
          icon: "search",
          stylingMode: "outlined",
          type: "normal",
          onClick: function () {
            t._searchInput.focus();
          }
        }
      }]
    });
  };
  g._renderScrollView = function (e) {
    var t = this;
    var n = (0, o.default)("<div>").appendTo(e);
    this._scrollView = this._createComponent(n, c.default);
    var i = this._scrollView._moveIsAllowed.bind(this._scrollView);
    this._scrollView._moveIsAllowed = function (e) {
      for (var n = 0; n < t._toolboxes.length; n++) {
        var a = t._toolboxes[n];
        if ((0, o.default)(a).children(".dxdi-tb-start-drag-flag").length) {
          return false;
        }
      }
      return i(e);
    };
    var a = (0, o.default)("<div>").appendTo(this._scrollView.content());
    this._updateElementWidth(a);
    this._renderAccordion(a);
  };
  g._getAccordionDataSource = function () {
    var e = this;
    var t = [];
    for (var n = this.option("toolboxGroups"), i = 0; i < n.length; i++) {
      var a = n[i].category;
      var r = {
        category: a,
        title: n[i].title || a,
        expanded: n[i].expanded,
        displayMode: n[i].displayMode,
        shapes: n[i].shapes,
        onTemplate: function (t, n, i) {
          var a = (0, o.default)(n);
          e._onShapeCategoryRenderedAction({
            category: i.category,
            displayMode: i.displayMode,
            dataToggle: "shape-toolbox-tooltip",
            shapes: i.shapes,
            $element: a
          });
          e._toolboxes.push(a);
          if (e._filterText !== "") {
            e._onFilterChangedAction({
              text: e._filterText,
              filteringToolboxes: e._toolboxes.length - 1
            });
          }
          e._createTooltips(a);
        }
      };
      t.push(r);
    }
    return t;
  };
  g._createTooltips = function (e) {
    var t = this;
    if (!this._isTouchMode()) {
      var n = e.find("[data-toggle=\"shape-toolbox-tooltip\"]");
      var i = this.$element();
      n.each(function (e, n) {
        var a = (0, o.default)(n);
        var r = a.attr("title");
        if (r) {
          var s = (0, o.default)("<div>").text(r).appendTo(i);
          t._createComponent(s, h.default, {
            target: a.get(0),
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            position: "top",
            animation: {
              show: {
                type: "fade",
                from: 0,
                to: 1,
                delay: 500
              },
              hide: {
                type: "fade",
                from: 1,
                to: 0,
                delay: 100
              }
            }
          });
        }
      });
    }
  };
  g._isTouchMode = function () {
    return (0, f.getDiagram)().Browser.TouchUI;
  };
  g._renderAccordion = function (e) {
    var t = this;
    this._accordion = this._createComponent(e, d.default, {
      multiple: true,
      animationDuration: 0,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      collapsible: true,
      displayExpr: "title",
      dataSource: this._getAccordionDataSource(),
      disabled: this.option("disabled"),
      itemTemplate: function (e, n, i) {
        e.onTemplate(t, i, e);
      },
      onSelectionChanged: function (e) {
        t._updateScrollAnimateSubscription(e.component);
      },
      onContentReady: function (e) {
        e.component.option("selectedItems", []);
        for (var n = e.component.option("dataSource"), i = 0; i < n.length; i++) {
          if (n[i].expanded === false) {
            e.component.collapseItem(i);
          } else if (n[i].expanded === true) {
            e.component.expandItem(i);
          }
        }
        if (n.length && n[0].expanded === undefined) {
          e.component.expandItem(0);
        }
        t._updateScrollAnimateSubscription(e.component);
      }
    });
  };
  g._updateScrollAnimateSubscription = function (e) {
    var t = this;
    e._deferredAnimate = new s.Deferred();
    e._deferredAnimate.done(function () {
      t.updateMaxHeight();
      t._scrollView.update();
      t._updateScrollAnimateSubscription(e);
    });
  };
  g._onInputChanged = function (e) {
    this._filterText = e;
    this._onFilterChangedAction({
      text: this._filterText,
      filteringToolboxes: this._toolboxes.map(function (e, t) {
        return t;
      })
    });
    this.updateTooltips();
    this.updateMaxHeight();
    this._scrollView.update();
  };
  g.updateFilter = function () {
    this._onInputChanged(this._filterText);
  };
  g.updateTooltips = function () {
    var e = this;
    this._toolboxes.forEach(function (t) {
      var n = (0, o.default)(t);
      e._createTooltips(n);
    });
  };
  g._createOnShapeCategoryRenderedAction = function () {
    this._onShapeCategoryRenderedAction = this._createActionByOption("onShapeCategoryRendered");
  };
  g._createOnFilterChangedAction = function () {
    this._onFilterChangedAction = this._createActionByOption("onFilterChanged");
  };
  g._optionChanged = function (t) {
    switch (t.name) {
      case "onShapeCategoryRendered":
        this._createOnShapeCategoryRenderedAction();
        break;
      case "onFilterChanged":
        this._createOnFilterChangedAction();
        break;
      case "showSearch":
      case "toolboxWidth":
        this._invalidate();
        break;
      case "toolboxGroups":
        this._accordion.option("dataSource", this._getAccordionDataSource());
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return p;
}(p.default);
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;