exports.plugin = exports.LoadingIndicator = undefined;
var i = require("./19157.js");
function o(e) {
  var t = e.renderer;
  this._group = t.g().attr({
    class: "dx-loading-indicator"
  }).linkOn(t.root, {
    name: "loading-indicator",
    after: "peripheral"
  });
  this._rect = t.rect().attr({
    opacity: 0
  }).append(this._group);
  this._text = t.text().attr({
    align: "center"
  }).append(this._group);
  this._createStates(e.eventTrigger, this._group, t.root, e.notify);
}
exports.LoadingIndicator = o;
o.prototype = {
  constructor: o,
  _createStates: function (e, t, n, i) {
    this._states = [{
      opacity: 0,
      start: function () {
        i(false);
      },
      complete: function () {
        t.linkRemove();
        n.css({
          "pointer-events": ""
        });
        e("loadingIndicatorReady");
      }
    }, {
      opacity: 0.85,
      start: function () {
        t.linkAppend();
        n.css({
          "pointer-events": "none"
        });
        i(true);
      },
      complete: function () {
        e("loadingIndicatorReady");
      }
    }];
    this._state = 0;
  },
  setSize: function (e) {
    var t = e.width;
    var n = e.height;
    this._rect.attr({
      width: t,
      height: n
    });
    this._text.attr({
      x: t / 2,
      y: n / 2
    });
  },
  setOptions: function (e) {
    this._rect.attr({
      fill: e.backgroundColor
    });
    this._text.css((0, i.patchFontOptions)(e.font)).attr({
      text: e.text,
      class: e.cssClass
    });
    this[e.show ? "show" : "hide"]();
  },
  dispose: function () {
    this._group.linkRemove().linkOff();
    this._group = this._rect = this._text = this._states = null;
  },
  _transit: function (e) {
    var t;
    if (this._state !== e) {
      this._state = e;
      this._isHiding = false;
      t = this._states[e];
      this._rect.stopAnimation().animate({
        opacity: t.opacity
      }, {
        complete: t.complete,
        easing: "linear",
        duration: 400,
        unstoppable: true
      });
      this._noHiding = true;
      t.start();
      this._noHiding = false;
    }
  },
  show: function () {
    this._transit(1);
  },
  hide: function () {
    this._transit(0);
  },
  scheduleHiding: function () {
    if (!this._noHiding) {
      this._isHiding = true;
    }
  },
  fulfillHiding: function () {
    if (this._isHiding) {
      this.hide();
    }
  }
};
var a = {
  name: "loading_indicator",
  init: function () {
    var e = this;
    e._loadingIndicator = new o({
      eventTrigger: e._eventTrigger,
      renderer: e._renderer,
      notify: function (t) {
        e._skipLoadingIndicatorOptions = true;
        e.option("loadingIndicator", {
          show: t
        });
        e._skipLoadingIndicatorOptions = false;
        if (t) {
          e._stopCurrentHandling();
        }
      }
    });
    e._scheduleLoadingIndicatorHiding();
  },
  dispose: function () {
    this._loadingIndicator.dispose();
    this._loadingIndicator = null;
  },
  members: {
    _scheduleLoadingIndicatorHiding: function () {
      this._loadingIndicator.scheduleHiding();
    },
    _fulfillLoadingIndicatorHiding: function () {
      this._loadingIndicator.fulfillHiding();
    },
    showLoadingIndicator: function () {
      this._loadingIndicator.show();
    },
    hideLoadingIndicator: function () {
      this._loadingIndicator.hide();
    },
    _onBeginUpdate: function () {
      if (!this._optionChangedLocker) {
        this._scheduleLoadingIndicatorHiding();
      }
    }
  },
  extenders: {
    _dataSourceLoadingChangedHandler: function (e) {
      if (e && (this._options.silent("loadingIndicator") || {}).enabled) {
        this._loadingIndicator.show();
      }
    },
    _setContentSize: function () {
      this._loadingIndicator.setSize(this._canvas);
    },
    endUpdate: function () {
      if (this._initialized && this._dataIsReady()) {
        this._fulfillLoadingIndicatorHiding();
      }
    }
  },
  customize: function (e) {
    var t = e.prototype;
    if (t._dataSourceChangedHandler) {
      var n = t._dataSourceChangedHandler;
      t._dataSourceChangedHandler = function () {
        this._scheduleLoadingIndicatorHiding();
        n.apply(this, arguments);
      };
    }
    e.addChange({
      code: "LOADING_INDICATOR",
      handler: function () {
        if (!this._skipLoadingIndicatorOptions) {
          this._loadingIndicator.setOptions(this._getOption("loadingIndicator"));
        }
        this._scheduleLoadingIndicatorHiding();
      },
      isThemeDependent: true,
      option: "loadingIndicator",
      isOptionChange: true
    });
    t._eventsMap.onLoadingIndicatorReady = {
      name: "loadingIndicatorReady"
    };
    var i = t._drawn;
    t._drawn = function () {
      i.apply(this, arguments);
      if (this._dataIsReady()) {
        this._fulfillLoadingIndicatorHiding();
      }
    };
  },
  fontFields: ["loadingIndicator.font"]
};
exports.plugin = a;