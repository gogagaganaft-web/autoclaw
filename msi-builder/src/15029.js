exports.custom = exports.confirm = exports.alert = undefined;
var i = require("./58664.js");
var o = b(require("./68374.js"));
var a = b(require("./62414.js"));
var r = b(require("./20530.js"));
var s = b(require("./80209.js"));
var l = require("./3532.js");
var u = require("./62754.js");
var d = require("./35922.js");
var c = require("./95479.js");
var h = require("./13306.js");
var f = require("./58201.js");
var p = b(require("./55994.js"));
var g = require("./77695.js");
var m = b(require("./28109.js"));
var _ = b(require("./96688.js"));
var v = b(require("./51495.js"));
var y = require("./20576.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var x = (0, f.getWindow)();
var w = {
  text: "OK",
  onClick: function () {
    return true;
  }
};
var C = `dx-dialog-wrapper`;
var S = `dx-dialog-root`;
var k = `dx-dialog-content`;
var D = `dx-dialog-message`;
var I = `dx-dialog-buttons`;
var T = `dx-dialog-button`;
function E(e) {
  var n = new u.Deferred();
  e = e || {};
  var d = (0, o.default)("<div>").addClass("dx-dialog").appendTo((0, g.value)());
  var f = "messageHtml" in e;
  if ("message" in e) {
    _.default.log("W1013");
  }
  var m = String(f ? e.messageHtml : e.message);
  var b = (0, o.default)("<div>").addClass(D).html(m);
  var E = [];
  (0, c.each)(e.buttons || [w], function () {
    var e = new a.default(this.onClick, {
      context: O
    });
    E.push({
      toolbar: "bottom",
      location: r.default.current().android ? "after" : "center",
      widget: "dxButton",
      options: (0, h.extend)({}, this, {
        onClick: function () {
          var t = e.execute.apply(e, arguments);
          A(t);
        }
      })
    });
  });
  var O = new v.default(d, (0, h.extend)({
    title: e.title ?? "",
    showTitle: (0, y.ensureDefined)(e.showTitle, true),
    dragEnabled: (0, y.ensureDefined)(e.dragEnabled, true),
    height: "auto",
    width: e.width,
    showCloseButton: e.showCloseButton || false,
    ignoreChildEvents: false,
    container: d,
    visualContainer: x,
    dragAndResizeArea: x,
    onContentReady: function (e) {
      e.component.$content().addClass(k).append(b);
    },
    onShowing: function (e) {
      e.component.bottomToolbar().addClass(I).find(`.dx-button`).addClass(T);
      (0, l.resetActiveElement)();
    },
    onShown: function (e) {
      var t = e.component.bottomToolbar().find(`.dx-button`).first();
      p.default.trigger(t, "focus");
    },
    onHiding: function () {
      n.reject();
    },
    onHidden: function (e) {
      var t = e.element;
      (0, o.default)(t).remove();
    },
    toolbarItems: E,
    animation: {
      show: {
        type: "pop",
        duration: 400
      },
      hide: {
        type: "pop",
        duration: 400,
        to: {
          opacity: 0,
          scale: 0
        },
        from: {
          opacity: 1,
          scale: 1
        }
      }
    },
    rtlEnabled: (0, s.default)().rtlEnabled,
    position: {
      boundaryOffset: {
        h: 10,
        v: 0
      }
    }
  }, e.popupOptions));
  function A(e) {
    n.resolve(e);
    O.hide();
  }
  O.$wrapper().addClass(C);
  if (e.position) {
    O.option("position", e.position);
  }
  O.$wrapper().addClass(S);
  return {
    show: function () {
      if (r.default.real().deviceType === "phone") {
        var e = (0, i.getHeight)(x) > (0, i.getWidth)(x) ? "90%" : "60%";
        O.option({
          width: e
        });
      }
      O.show();
      return n.promise();
    },
    hide: A
  };
}
exports.custom = E;
exports.alert = function (e, t = "", n) {
  var i = (0, d.isPlainObject)(e) ? e : {
    title: t,
    messageHtml: e,
    showTitle: n,
    dragEnabled: n
  };
  return E(i).show();
};
exports.confirm = function (e, t = "", n) {
  var i = (0, d.isPlainObject)(e) ? e : {
    title: t,
    messageHtml: e,
    showTitle: n,
    buttons: [{
      text: m.default.format("Yes"),
      onClick: function () {
        return true;
      }
    }, {
      text: m.default.format("No"),
      onClick: function () {
        return false;
      }
    }],
    dragEnabled: n
  };
  return E(i).show();
};