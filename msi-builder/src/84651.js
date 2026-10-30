Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i = require("./62754.js");
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./36613.js");
var s = require("./35922.js");
var l = require("./58201.js");
var u = h(require("./55994.js"));
var d = h(require("./96688.js"));
var c = h(require("./15943.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f;
var p;
var g = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
var m = function e(t) {
  if (t) {
    (0, a.each)(t, function (n, i) {
      if ((0, s.isPlainObject)(i) || Array.isArray(i)) {
        e(i);
      } else if (typeof i == "string") {
        var o = g.exec(i);
        if (o) {
          t[n] = new Date(Date.UTC(+o[1], +o[2] - 1, +o[3], +o[4], +o[5], +o[6]));
        }
      }
    });
  }
};
var _ = {
  StateStoringController: c.default.ViewController.inherit((f = function (e) {
    var t = e.type === "sessionStorage" ? (0, r.sessionStorage)() : (0, l.getWindow)().localStorage;
    if (!t) {
      throw new Error("E1007");
    }
    return t;
  }, p = function (e) {
    if ((0, s.isDefined)(e.storageKey)) {
      return e.storageKey;
    } else {
      return "storage";
    }
  }, {
    _loadState: function () {
      var e = this.option("stateStoring");
      if (e.type === "custom") {
        return e.customLoad && e.customLoad();
      }
      try {
        return JSON.parse(f(e).getItem(p(e)));
      } catch (e) {
        d.default.log("W1022", "State storing", e.message);
      }
    },
    _saveState: function (e) {
      var t = this.option("stateStoring");
      if (t.type !== "custom") {
        try {
          f(t).setItem(p(t), JSON.stringify(e));
        } catch (e) {
          d.default.log(e.message);
        }
      } else if (t.customSave) {
        t.customSave(e);
      }
    },
    publicMethods: function () {
      return ["state"];
    },
    isEnabled: function () {
      return this.option("stateStoring.enabled");
    },
    init: function () {
      var e = this;
      e._state = {};
      e._isLoaded = false;
      e._isLoading = false;
      e._windowUnloadHandler = function () {
        if (e._savingTimeoutID !== undefined) {
          e._saveState(e.state());
        }
      };
      u.default.on((0, l.getWindow)(), "unload", e._windowUnloadHandler);
      return e;
    },
    isLoaded: function () {
      return this._isLoaded;
    },
    isLoading: function () {
      return this._isLoading;
    },
    load: function () {
      var e = this;
      this._isLoading = true;
      var t = (0, i.fromPromise)(this._loadState());
      t.always(function () {
        e._isLoaded = true;
        e._isLoading = false;
      }).done(function (t) {
        if (t !== null && !(0, s.isEmptyObject)(t)) {
          e.state(t);
        }
      });
      return t;
    },
    state: function (e) {
      var t = this;
      if (!arguments.length) {
        return (0, o.extend)(true, {}, t._state);
      }
      t._state = (0, o.extend)({}, e);
      m(t._state);
    },
    save: function () {
      var e = this;
      clearTimeout(e._savingTimeoutID);
      e._savingTimeoutID = setTimeout(function () {
        e._saveState(e.state());
        e._savingTimeoutID = undefined;
      }, e.option("stateStoring.savingTimeout"));
    },
    optionChanged: function (e) {
      switch (e.name) {
        case "stateStoring":
          if (this.isEnabled() && !this.isLoading()) {
            this.load();
          }
          e.handled = true;
          break;
        default:
          this.callBase(e);
      }
    },
    dispose: function () {
      clearTimeout(this._savingTimeoutID);
      u.default.off((0, l.getWindow)(), "unload", this._windowUnloadHandler);
    }
  }))
};
exports.default = _;