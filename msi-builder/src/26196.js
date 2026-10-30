Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
require("./90130.js");
require("./96291.js");
require("./3263.js");
require("./10792.js");
require("./86226.js");
require("./74043.js");
require("./46950.js");
require("./24734.js");
require("./63350.js");
var i = g(require("./99393.js"));
var o = g(require("./68374.js"));
var a = g(require("./47810.js"));
var r = require("./20576.js");
var s = require("./30869.js");
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./35922.js");
var c = require("./75811.js");
var h = g(require("./14390.js"));
var f = g(require("./60082.js"));
var p = g(require("./74938.js"));
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
p.default.registerModulesOrder(["stateStoring", "columns", "selection", "editorFactory", "columnChooser", "grouping", "editing", "editingRowBased", "editingFormBased", "editingCellBased", "masterDetail", "validating", "adaptivity", "data", "virtualScrolling", "columnHeaders", "filterRow", "headerPanel", "headerFilter", "sorting", "search", "rows", "pager", "columnsResizingReordering", "contextMenu", "keyboardNavigation", "errorHandling", "summary", "columnFixing", "export", "gridView"]);
var m = h.default.inherit({
  _activeStateUnit: ".dx-row",
  _getDefaultOptions: function () {
    var e = this.callBase();
    (0, u.each)(p.default.modules, function () {
      if ((0, d.isFunction)(this.defaultOptions)) {
        (0, l.extend)(true, e, this.defaultOptions());
      }
    });
    return e;
  },
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, l.extend)(this._deprecatedOptions, {
      useKeyboard: {
        since: "19.2",
        alias: "keyboardNavigation.enabled"
      },
      rowTemplate: {
        since: "21.2",
        message: "Use the \"dataRowTemplate\" option instead"
      },
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
      device: {
        platform: "ios"
      },
      options: {
        showRowLines: true
      }
    }, {
      device: function () {
        return (0, c.isMaterial)();
      },
      options: {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
          height: 315
        },
        editing: {
          useIcons: true
        },
        selection: {
          showCheckBoxesMode: "always"
        }
      }
    }, {
      device: function () {
        return a.default.webkit;
      },
      options: {
        loadingTimeout: 30,
        loadPanel: {
          animation: {
            show: {
              easing: "cubic-bezier(1, 0, 1, 0)",
              duration: 500,
              from: {
                opacity: 0
              },
              to: {
                opacity: 1
              }
            }
          }
        }
      }
    }, {
      device: function (e) {
        return e.deviceType !== "desktop";
      },
      options: {
        grouping: {
          expandMode: "rowClick"
        }
      }
    }]);
  },
  _init: function () {
    this.callBase();
    f.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    p.default.processModules(this, p.default);
    p.default.callModuleItemsMethod(this, "init");
  },
  _clean: r.noop,
  _optionChanged: function (e) {
    p.default.callModuleItemsMethod(this, "optionChanged", [e]);
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
    this.getView("gridView").render(this.$element());
  },
  _renderContentImpl: function () {
    this.getView("gridView").update();
  },
  _renderContent: function () {
    var e = this;
    (0, r.deferRender)(function () {
      e._renderContentImpl();
    });
  },
  _getTemplate: function (e) {
    var t = e;
    if ((0, d.isString)(t) && t.startsWith("#")) {
      t = (0, o.default)(e);
      s.logger.warn("Specifying grid templates with the jQuery selector name is now deprecated. Use the DOM Node or the jQuery object that references this selector instead.");
    }
    return this.callBase(t);
  },
  _dispose: function () {
    this.callBase();
    p.default.callModuleItemsMethod(this, "dispose");
  },
  isReady: function () {
    return this.getController("data").isReady();
  },
  beginUpdate: function () {
    this.callBase();
    p.default.callModuleItemsMethod(this, "beginUpdate");
  },
  endUpdate: function () {
    p.default.callModuleItemsMethod(this, "endUpdate");
    this.callBase();
  },
  getController: function (e) {
    return this._controllers[e];
  },
  getView: function (e) {
    return this._views[e];
  },
  focus: function (e) {
    this.getController("keyboardNavigation").focus(e);
  }
});
m.registerModule = p.default.registerModule.bind(p.default);
(0, i.default)("dxDataGrid", m);
var _ = m;
exports.default = _;