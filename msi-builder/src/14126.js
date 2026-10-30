Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
require("./25052.js");
require("./79873.js");
require("./26686.js");
require("./7138.js");
require("./31397.js");
require("./87454.js");
require("./84973.js");
require("./94907.js");
require("./37980.js");
var i = h(require("./99393.js"));
var o = require("./20576.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./35922.js");
var l = require("./75811.js");
var u = h(require("./14390.js"));
var d = h(require("./60082.js"));
var c = h(require("./12500.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = c.default.callModuleItemsMethod;
c.default.registerModulesOrder(["stateStoring", "columns", "selection", "editorFactory", "columnChooser", "editingRowBased", "editingFormBased", "editingCellBased", "editing", "grouping", "masterDetail", "validating", "adaptivity", "data", "virtualScrolling", "columnHeaders", "filterRow", "headerPanel", "headerFilter", "sorting", "search", "rows", "pager", "columnsResizingReordering", "contextMenu", "keyboardNavigation", "errorHandling", "summary", "columnFixing", "export", "gridView"]);
var p = u.default.inherit({
  _activeStateUnit: ".dx-row",
  _getDefaultOptions: function () {
    var e = this.callBase();
    (0, r.each)(c.default.modules, function () {
      if ((0, s.isFunction)(this.defaultOptions)) {
        (0, a.extend)(true, e, this.defaultOptions());
      }
    });
    return e;
  },
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, a.extend)(this._deprecatedOptions, {
      "columnChooser.allowSearch": {
        since: "23.1",
        message: "Use the \"columnChooser.search.enabled\" option instead"
      },
      "columnChooser.searchTimeout": {
        since: "23.1",
        message: "Use the \"columnChooser.search.timeout\" option instead"
      }
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return (0, l.isMaterial)();
      },
      options: {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
          height: 315
        },
        editing: {
          useIcons: true
        }
      }
    }]);
  },
  _init: function () {
    this.callBase();
    if (!this.option("_disableDeprecationWarnings")) {
      d.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    }
    c.default.processModules(this, c.default);
    f(this, "init");
  },
  _clean: o.noop,
  _optionChanged: function (e) {
    f(this, "optionChanged", [e]);
    if (!e.handled) {
      this.callBase(e);
    }
  },
  _dimensionChanged: function () {
    this.updateDimensions(true);
  },
  _visibilityChanged: function (e) {
    if (e) {
      this.updateDimensions();
    }
  },
  _initMarkup: function () {
    this.callBase.apply(this, arguments);
    this.$element().addClass("dx-treelist");
    this.getView("gridView").render(this.$element());
  },
  _renderContentImpl: function () {
    this.getView("gridView").update();
  },
  _renderContent: function () {
    var e = this;
    (0, o.deferRender)(function () {
      e._renderContentImpl();
    });
  },
  _dispose: function () {
    this.callBase();
    f(this, "dispose");
  },
  isReady: function () {
    return this.getController("data").isReady();
  },
  beginUpdate: function () {
    this.callBase();
    f(this, "beginUpdate");
  },
  endUpdate: function () {
    f(this, "endUpdate");
    this.callBase();
  },
  getController: function (e) {
    return this._controllers[e];
  },
  getView: function (e) {
    return this._views[e];
  },
  focus: function (e) {
    this.callBase();
    if ((0, s.isDefined)(e)) {
      this.getController("keyboardNavigation").focus(e);
    }
  }
});
p.registerModule = c.default.registerModule.bind(c.default);
(0, i.default)("dxTreeList", p);
var g = p;
exports.default = g;