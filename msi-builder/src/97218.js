exports.default = undefined;
var i = h(require("./68374.js"));
var o = require("./20576.js");
var a = h(require("./28109.js"));
var r = h(require("./99393.js"));
var s = require("./13306.js");
var l = h(require("./2492.js"));
var u = h(require("./89799.js"));
var d = require("./62754.js");
var c = require("./75811.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = u.default.inherit({
  _supportedKeys: function () {
    return (0, s.extend)(this.callBase(), {
      escape: o.noop
    });
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      message: a.default.format("Loading"),
      width: 222,
      height: 90,
      animation: null,
      showIndicator: true,
      indicatorSrc: "",
      showPane: true,
      delay: 0,
      templatesRenderAsynchronously: false,
      hideTopOverlayHandler: null,
      focusStateEnabled: false,
      propagateOutsideClick: true,
      preventScrollEvents: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: {
        platform: "generic"
      },
      options: {
        shadingColor: "transparent"
      }
    }, {
      device: function () {
        return (0, c.isMaterial)();
      },
      options: {
        message: "",
        width: 60,
        height: 60,
        maxHeight: 60,
        maxWidth: 60
      }
    }]);
  },
  _init: function () {
    this.callBase.apply(this, arguments);
  },
  _render: function () {
    this.callBase();
    this.$element().addClass("dx-loadpanel");
    this.$wrapper().addClass("dx-loadpanel-wrapper");
  },
  _renderContentImpl: function () {
    this.callBase();
    this.$content().addClass("dx-loadpanel-content");
    this._$loadPanelContentWrapper = (0, i.default)("<div>").addClass("dx-loadpanel-content-wrapper");
    this._$loadPanelContentWrapper.appendTo(this.$content());
    this._togglePaneVisible();
    this._cleanPreviousContent();
    this._renderLoadIndicator();
    this._renderMessage();
  },
  _show: function () {
    var e = this.option("delay");
    if (!e) {
      return this.callBase();
    }
    var t = new d.Deferred();
    var n = this.callBase.bind(this);
    this._clearShowTimeout();
    this._showTimeout = setTimeout(function () {
      n().done(function () {
        t.resolve();
      });
    }, e);
    return t.promise();
  },
  _hide: function () {
    this._clearShowTimeout();
    return this.callBase();
  },
  _clearShowTimeout: function () {
    clearTimeout(this._showTimeout);
  },
  _renderMessage: function () {
    if (this._$loadPanelContentWrapper) {
      var e = this.option("message");
      if (e) {
        var t = (0, i.default)("<div>").addClass("dx-loadpanel-message").text(e);
        this._$loadPanelContentWrapper.append(t);
      }
    }
  },
  _renderLoadIndicator: function () {
    if (this._$loadPanelContentWrapper && this.option("showIndicator")) {
      this._$indicator ||= (0, i.default)("<div>").addClass("dx-loadpanel-indicator").appendTo(this._$loadPanelContentWrapper);
      this._createComponent(this._$indicator, l.default, {
        indicatorSrc: this.option("indicatorSrc")
      });
    }
  },
  _cleanPreviousContent: function () {
    this.$content().find(".dx-loadpanel-message").remove();
    this.$content().find(".dx-loadpanel-indicator").remove();
    delete this._$indicator;
  },
  _togglePaneVisible: function () {
    this.$content().toggleClass("dx-loadpanel-pane-hidden", !this.option("showPane"));
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "delay":
        break;
      case "message":
      case "showIndicator":
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage();
        break;
      case "showPane":
        this._togglePaneVisible();
        break;
      case "indicatorSrc":
        this._renderLoadIndicator();
        break;
      default:
        this.callBase(e);
    }
  },
  _dispose: function () {
    this._clearShowTimeout();
    this.callBase();
  }
});
(0, r.default)("dxLoadPanel", f);
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;