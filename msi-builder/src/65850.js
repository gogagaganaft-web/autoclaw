exports.getViewSwitcher = exports.getDropDownViewSwitcher = undefined;
var i = require("./74842.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
function a(e) {
  var t = (0, i.formatViews)(e.views);
  var n = (0, i.getViewName)(e.currentView);
  var o = t.some(function (e) {
    return e.name === n;
  });
  return {
    selectedView: n = o ? n : undefined,
    views: t
  };
}
exports.getViewSwitcher = function (e, t) {
  var n = a(e);
  var r = n.selectedView;
  return o({
    widget: "dxButtonGroup",
    locateInMenu: "auto",
    cssClass: "dx-scheduler-view-switcher",
    options: {
      items: n.views,
      keyExpr: "name",
      selectedItemKeys: [r],
      stylingMode: "contained",
      onItemClick: function (t) {
        var n = t.itemData.view;
        e._updateCurrentView(n);
      },
      onContentReady: function (t) {
        var n = t.component;
        e._addEvent("currentView", function (e) {
          n.option("selectedItemKeys", [(0, i.getViewName)(e)]);
        });
      }
    }
  }, t);
};
exports.getDropDownViewSwitcher = function (e, t) {
  var n = a(e);
  var r = n.selectedView;
  var s = n.views;
  var l = (0, i.isOneView)(s, r);
  return o({
    widget: "dxDropDownButton",
    locateInMenu: "never",
    cssClass: "dx-scheduler-view-switcher",
    options: {
      items: s,
      useSelectMode: true,
      keyExpr: "name",
      selectedItemKey: r,
      displayExpr: "text",
      showArrowIcon: !l,
      elementAttr: {
        class: "dx-scheduler-view-switcher-dropdown-button"
      },
      onItemClick: function (t) {
        var n = t.itemData.view;
        e._updateCurrentView(n);
      },
      onContentReady: function (t) {
        var n = t.component;
        e._addEvent("currentView", function (t) {
          var o = (0, i.formatViews)(e.views);
          if ((0, i.isOneView)(o, t)) {
            e.repaint();
          }
          n.option("selectedItemKey", (0, i.getViewName)(t));
        });
      },
      dropDownOptions: {
        onShowing: function (e) {
          if (l) {
            e.cancel = true;
          }
        },
        width: "max-content",
        _wrapperClassExternal: "dx-scheduler-view-switcher-dropdown-button-content"
      }
    }
  }, t);
};