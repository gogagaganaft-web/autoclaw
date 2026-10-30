var i = require("./13306.js");
var o = require("./92018.js");
var a = s(require("./22821.js"));
var r = s(require("./12500.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = o.virtualScrollingModule.defaultOptions;
var u = o.virtualScrollingModule.extenders.controllers.data;
var d = o.virtualScrollingModule.extenders.dataSourceAdapter;
o.virtualScrollingModule.extenders.controllers.data = (0, i.extend)({}, u, {
  _loadOnOptionChange: function () {
    var e = this._dataSource && this._dataSource._virtualScrollController;
    if (e) {
      e.reset();
    }
    this.callBase();
  }
});
o.virtualScrollingModule.extenders.dataSourceAdapter = (0, i.extend)({}, d, {
  changeRowExpand: function () {
    var e = this;
    return this.callBase.apply(this, arguments).done(function () {
      var t = e.getViewportItemIndex();
      if (t >= 0) {
        e.setViewportItemIndex(t);
      }
    });
  }
});
r.default.registerModule("virtualScrolling", (0, i.extend)({}, o.virtualScrollingModule, {
  defaultOptions: function () {
    return (0, i.extend)(true, l(), {
      scrolling: {
        mode: "virtual"
      }
    });
  }
}));
a.default.extend(o.virtualScrollingModule.extenders.dataSourceAdapter);