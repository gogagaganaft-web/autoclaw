var i = f(require("./68374.js"));
var o = f(require("./55994.js"));
var a = require("./95429.js");
var r = require("./13306.js");
var s = f(require("./96688.js"));
var l = f(require("./18859.js"));
var u = f(require("./6282.js"));
var d = require("./39611.js");
var c = require("./40245.js");
var h = f(require("./61225.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p = (0, d.addNamespace)(a.name, "dxListEditDecorator");
(0, c.register)("selection", "default", h.default.inherit({
  _init: function () {
    this.callBase.apply(this, arguments);
    var e = this._list.option("selectionMode");
    this._singleStrategy = e === "single";
    this._containerClass = this._singleStrategy ? "dx-list-select-radiobutton-container" : "dx-list-select-checkbox-container";
    this._controlClass = this._singleStrategy ? "dx-list-select-radiobutton" : "dx-list-select-checkbox";
    this._controlWidget = this._singleStrategy ? u.default : l.default;
    this._list.$element().addClass("dx-list-select-decorator-enabled");
  },
  beforeBag: function (e) {
    var t = e.$itemElement;
    var n = e.$container.addClass(this._containerClass);
    var o = (0, i.default)("<div>").addClass(this._controlClass).appendTo(n);
    new this._controlWidget(o, (0, r.extend)(this._commonOptions(), {
      value: this._isSelected(t),
      elementAttr: {
        "aria-label": "Check State"
      },
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onValueChanged: function (e) {
        if (e.event) {
          this._list._saveSelectionChangeEvent(e.event);
        }
        this._processCheckedState(t, e.value);
        if (e.event) {
          e.event.stopPropagation();
        }
      }.bind(this)
    }));
  },
  modifyElement: function (e) {
    this.callBase.apply(this, arguments);
    var t = e.$itemElement;
    var n = this._controlWidget.getInstance(t.find("." + this._controlClass));
    o.default.on(t, "stateChanged", function (e, t) {
      n.option("value", t);
    }.bind(this));
  },
  _updateSelectAllState: function () {
    if (this._$selectAll) {
      this._selectAllCheckBox.option("value", this._list.isSelectAll());
    }
  },
  afterRender: function () {
    if (this._list.option("selectionMode") === "all") {
      if (this._$selectAll) {
        this._updateSelectAllState();
      } else {
        this._renderSelectAll();
      }
    }
  },
  handleKeyboardEvents: function (e, t) {
    var n = !t;
    var i = this._list;
    var o = this._$selectAll;
    var a = i._getLastItemIndex();
    return !!o && (!!t && e === 0 || !!n && e === a) && (i.option("focusedElement", o), i.scrollToItem(i.option("focusedElement")), true);
  },
  handleEnterPressing: function (e) {
    if (this._$selectAll && this._$selectAll.hasClass("dx-state-focused")) {
      e.target = this._$selectAll.get(0);
      this._list._saveSelectionChangeEvent(e);
      this._selectAllCheckBox.option("value", !this._selectAllCheckBox.option("value"));
      return true;
    }
  },
  _renderSelectAll: function () {
    var e = this._$selectAll = (0, i.default)("<div>").addClass("dx-list-select-all");
    var t = this._list;
    var n = t._supportedKeys().downArrow.bind(t);
    this._selectAllCheckBox = t._createComponent((0, i.default)("<div>").addClass("dx-list-select-all-checkbox").appendTo(e), l.default, {
      elementAttr: {
        "aria-label": "Select All"
      },
      focusStateEnabled: false,
      hoverStateEnabled: false
    });
    this._selectAllCheckBox.registerKeyHandler("downArrow", n);
    (0, i.default)("<div>").addClass("dx-list-select-all-label").text(this._list.option("selectAllText")).appendTo(e);
    this._list.itemsContainer().prepend(e);
    this._updateSelectAllState();
    this._attachSelectAllHandler();
  },
  _attachSelectAllHandler: function () {
    this._selectAllCheckBox.option("onValueChanged", this._selectAllHandler.bind(this));
    o.default.off(this._$selectAll, p);
    o.default.on(this._$selectAll, p, this._selectAllClickHandler.bind(this));
  },
  _selectAllHandler: function (e) {
    if (e.event) {
      e.event.stopPropagation();
    }
    var t = this._selectAllCheckBox.option("value");
    if (e.event) {
      this._list._saveSelectionChangeEvent(e.event);
    }
    if (t === true) {
      this._selectAllItems();
    } else if (t === false) {
      this._unselectAllItems();
    }
    this._list._createActionByOption("onSelectAllValueChanged")({
      value: t
    });
  },
  _checkSelectAllCapability: function () {
    var e = this._list;
    var t = e._dataController;
    return e.option("selectAllMode") !== "allPages" || !e.option("grouped") || !!t.group() || (s.default.log("W1010"), false);
  },
  _selectAllItems: function () {
    if (this._checkSelectAllCapability()) {
      this._list._selection.selectAll(this._list.option("selectAllMode") === "page");
    }
  },
  _unselectAllItems: function () {
    if (this._checkSelectAllCapability()) {
      this._list._selection.deselectAll(this._list.option("selectAllMode") === "page");
    }
  },
  _selectAllClickHandler: function (e) {
    this._list._saveSelectionChangeEvent(e);
    this._selectAllCheckBox.option("value", !this._selectAllCheckBox.option("value"));
  },
  _isSelected: function (e) {
    return this._list.isItemSelected(e);
  },
  _processCheckedState: function (e, t) {
    if (t) {
      this._list.selectItem(e);
    } else {
      this._list.unselectItem(e);
    }
  },
  dispose: function () {
    this._disposeSelectAll();
    this._list.$element().removeClass("dx-list-select-decorator-enabled");
    this.callBase.apply(this, arguments);
  },
  _disposeSelectAll: function () {
    if (this._$selectAll) {
      this._$selectAll.remove();
      this._$selectAll = null;
    }
  }
}));