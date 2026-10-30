exports.default = undefined;
var i = require("./52431.js");
var o = v(require("./99393.js"));
var a = v(require("./73349.js"));
var r = v(require("./68374.js"));
var s = require("./20576.js");
var l = require("./62754.js");
var u = require("./13306.js");
var d = require("./95479.js");
var c = require("./35922.js");
var h = require("./58201.js");
var f = v(require("./55994.js"));
var p = require("./80506.js");
var g = v(require("./2492.js"));
var m = v(require("./14390.js"));
var _ = require("./37518.js");
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var y = (0, h.getWindow)();
var b = ["onRendered", "onShown"];
var x = m.default.inherit({
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      showLoadIndicator: false,
      renderWhen: undefined,
      animation: undefined,
      staggerItemSelector: undefined,
      onRendered: null,
      onShown: null
    });
  },
  _getAnonymousTemplateName: function () {
    return "content";
  },
  _init: function () {
    this.transitionExecutor = new i.TransitionExecutor();
    this._initElement();
    this._initRender();
    this._$initialContent = this.$element().clone().contents();
    this._initActions();
    this.callBase();
  },
  _initElement: function () {
    this.$element().addClass("dx-deferrendering");
  },
  _initRender: function () {
    var e = this;
    var t = this.$element();
    var n = this.option("renderWhen");
    function i() {
      return e._renderDeferredContent();
    }
    if ((0, c.isPromise)(n)) {
      (0, l.fromPromise)(n).done(i);
    } else {
      t.data("dx-render-delegate", i);
      if (n === undefined) {
        t.addClass("dx-pending-rendering-manual");
      }
    }
  },
  _initActions: function () {
    var e = this;
    this._actions = {};
    (0, d.each)(b, function (t, n) {
      e._actions[n] = e._createActionByOption(n) || s.noop;
    });
  },
  _initMarkup: function () {
    this.callBase();
    if (!this._initContent) {
      this._initContent = this._renderContent;
      this._renderContent = function () {};
    }
    this._initContent();
  },
  _renderContentImpl: function () {
    this.$element().removeClass("dx-widget");
    this.$element().append(this._$initialContent);
    this._setLoadingState();
  },
  _renderDeferredContent: function () {
    var e = this;
    var t = this.$element();
    var n = new l.Deferred();
    t.removeClass("dx-pending-rendering-manual");
    t.addClass("dx-pending-rendering-active");
    this._abortRenderTask();
    this._renderTask = (0, s.executeAsync)(function () {
      e._renderImpl().done(function () {
        var i = {
          element: t
        };
        e._actions.onShown([i]);
        n.resolve(i);
      }).fail(function () {
        n.rejectWith(n, arguments);
      });
    });
    return n.promise();
  },
  _isElementInViewport: function (e) {
    var t = (0, _.getBoundingRect)(e);
    return t.bottom >= 0 && t.right >= 0 && t.top <= (y.innerHeight || a.default.getDocumentElement().clientHeight) && t.left <= (y.innerWidth || a.default.getDocumentElement().clientWidth);
  },
  _animate: function () {
    var e;
    var t = this;
    var n = this.$element();
    var i = (0, h.hasWindow)() && this.option("animation");
    var o = this.option("staggerItemSelector");
    t.transitionExecutor.stop();
    if (i) {
      if (o) {
        n.find(o).each(function () {
          if (t._isElementInViewport(this)) {
            t.transitionExecutor.enter((0, r.default)(this), i);
          }
        });
      } else {
        t.transitionExecutor.enter(n, i);
      }
      e = t.transitionExecutor.start();
    } else {
      e = new l.Deferred().resolve().promise();
    }
    return e;
  },
  _renderImpl: function () {
    var e = this.$element();
    var t = {
      element: e
    };
    var n = this._getTemplate(this._templateManager.anonymousTemplateName);
    if (n) {
      n.render({
        container: e.empty(),
        noModel: true
      });
    }
    this._setRenderedState(e);
    f.default.trigger(e, "dxcontentrendered");
    this._actions.onRendered([t]);
    this._isRendered = true;
    return this._animate();
  },
  _setLoadingState: function () {
    var e = this.$element();
    var t = !!e.find(".dx-visible-while-pending-rendering").length;
    e.addClass("dx-pending-rendering");
    if (!t) {
      e.children().addClass("dx-invisible-while-pending-rendering");
    }
    if (this.option("showLoadIndicator")) {
      this._showLoadIndicator(e);
    }
  },
  _showLoadIndicator: function (e) {
    this._$loadIndicator = new g.default((0, r.default)("<div>"), {
      visible: true
    }).$element().addClass("dx-deferrendering-load-indicator");
    (0, r.default)("<div>").addClass("dx-loadindicator-container").addClass("dx-deferrendering-loadindicator-container").append(this._$loadIndicator).appendTo(e);
  },
  _setRenderedState: function () {
    var e = this.$element();
    if (this._$loadIndicator) {
      this._$loadIndicator.remove();
    }
    e.removeClass("dx-pending-rendering");
    e.removeClass("dx-pending-rendering-active");
    (0, p.triggerShownEvent)(e.children());
  },
  _optionChanged: function (e) {
    var t = e.value;
    var n = e.previousValue;
    switch (e.name) {
      case "renderWhen":
        if (n === false && t === true) {
          this._renderOrAnimate();
        } else if (n === true && t === false) {
          this.transitionExecutor.stop();
          this._setLoadingState();
        }
        break;
      case "showLoadIndicator":
      case "onRendered":
      case "onShown":
        break;
      default:
        this.callBase(e);
    }
  },
  _renderOrAnimate: function () {
    var e;
    if (this._isRendered) {
      this._setRenderedState();
      e = this._animate();
    } else {
      e = this._renderDeferredContent();
    }
    return e;
  },
  renderContent: function () {
    return this._renderOrAnimate();
  },
  _abortRenderTask: function () {
    if (this._renderTask) {
      this._renderTask.abort();
      this._renderTask = undefined;
    }
  },
  _dispose: function () {
    this.transitionExecutor.stop(true);
    this._abortRenderTask();
    this._actions = undefined;
    this._$initialContent = undefined;
    this.callBase();
  }
});
(0, o.default)("dxDeferRendering", x);
var w = x;
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;