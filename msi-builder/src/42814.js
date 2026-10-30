exports.presets = exports.PresetCollection = undefined;
var i = require("./58664.js");
var o = require("./44297.js");
var a = require("./95479.js");
var r = require("./13306.js");
var s = u(require("./20530.js"));
var l = u(require("./87209.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = {
  forward: " dx-forward",
  backward: " dx-backward",
  none: " dx-no-direction",
  undefined: " dx-no-direction"
};
var c = o.Component.inherit({
  ctor: function () {
    this.callBase.apply(this, arguments);
    this._registeredPresets = [];
    this.resetToDefaults();
  },
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      defaultAnimationDuration: 400,
      defaultAnimationDelay: 0,
      defaultStaggerAnimationDuration: 300,
      defaultStaggerAnimationDelay: 40,
      defaultStaggerAnimationStartDelay: 500
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function (e) {
        return e.phone;
      },
      options: {
        defaultStaggerAnimationDuration: 350,
        defaultStaggerAnimationDelay: 50,
        defaultStaggerAnimationStartDelay: 0
      }
    }, {
      device: function () {
        return s.default.current().android || s.default.real.android;
      },
      options: {
        defaultAnimationDelay: 100
      }
    }]);
  },
  _getPresetOptionName: function (e) {
    return "preset_" + e;
  },
  _createAndroidSlideAnimationConfig: function (e, t) {
    var n = this;
    function o(e) {
      return {
        type: "slide",
        delay: e.delay === undefined ? n.option("defaultAnimationDelay") : e.delay,
        duration: e.duration === undefined ? n.option("defaultAnimationDuration") : e.duration
      };
    }
    return {
      enter: function (n, a) {
        var r = (0, i.getWidth)(n.parent()) * t;
        var s = a.direction;
        var u = o(a);
        u.to = {
          left: 0,
          opacity: 1
        };
        u.from = s === "forward" ? {
          left: r,
          opacity: e
        } : s === "backward" ? {
          left: -r,
          opacity: e
        } : {
          left: 0,
          opacity: 0
        };
        return l.default.createAnimation(n, u);
      },
      leave: function (n, a) {
        var r = (0, i.getWidth)(n.parent()) * t;
        var s = a.direction;
        var u = o(a);
        u.from = {
          left: 0,
          opacity: 1
        };
        u.to = s === "forward" ? {
          left: -r,
          opacity: e
        } : s === "backward" ? {
          left: r,
          opacity: e
        } : {
          left: 0,
          opacity: 0
        };
        return l.default.createAnimation(n, u);
      }
    };
  },
  _createOpenDoorConfig: function () {
    var e = this;
    function t(t) {
      return {
        type: "css",
        extraCssClasses: "dx-opendoor-animation",
        delay: t.delay === undefined ? e.option("defaultAnimationDelay") : t.delay,
        duration: t.duration === undefined ? e.option("defaultAnimationDuration") : t.duration
      };
    }
    return {
      enter: function (e, n) {
        var i = n.direction;
        var o = t(n);
        o.delay = i === "none" ? o.delay : o.duration;
        o.from = "dx-enter dx-opendoor-animation" + d[i];
        o.to = "dx-enter-active";
        return l.default.createAnimation(e, o);
      },
      leave: function (e, n) {
        var i = n.direction;
        var o = t(n);
        o.from = "dx-leave dx-opendoor-animation" + d[i];
        o.to = "dx-leave-active";
        return l.default.createAnimation(e, o);
      }
    };
  },
  _createWinPopConfig: function () {
    var e = this;
    var t = {
      type: "css",
      extraCssClasses: "dx-win-pop-animation",
      duration: e.option("defaultAnimationDuration")
    };
    return {
      enter: function (n, i) {
        var o = t;
        var a = i.direction;
        o.delay = a === "none" ? e.option("defaultAnimationDelay") : e.option("defaultAnimationDuration") / 2;
        o.from = "dx-enter dx-win-pop-animation" + d[a];
        o.to = "dx-enter-active";
        return l.default.createAnimation(n, o);
      },
      leave: function (n, i) {
        var o = t;
        var a = i.direction;
        o.delay = e.option("defaultAnimationDelay");
        o.from = "dx-leave dx-win-pop-animation" + d[a];
        o.to = "dx-leave-active";
        return l.default.createAnimation(n, o);
      }
    };
  },
  resetToDefaults: function () {
    this.clear();
    this.registerDefaultPresets();
    this.applyChanges();
  },
  clear: function (e) {
    var t = this;
    var n = [];
    (0, a.each)(this._registeredPresets, function (i, o) {
      if (e && e !== o.name) {
        n.push(o);
      } else {
        t.option(t._getPresetOptionName(o.name), undefined);
      }
    });
    this._registeredPresets = n;
    this.applyChanges();
  },
  registerPreset: function (e, t) {
    this._registeredPresets.push({
      name: e,
      config: t
    });
  },
  applyChanges: function () {
    var e = this;
    var t = [];
    (0, a.each)(this._registeredPresets, function (n, i) {
      var o = {
        device: i.config.device,
        options: {}
      };
      o.options[e._getPresetOptionName(i.name)] = i.config.animation;
      t.push(o);
    });
    this._setOptionsByDevice(t);
  },
  getPreset: function (e) {
    for (var t = e; typeof t == "string";) {
      t = this.option(this._getPresetOptionName(t));
    }
    return t;
  },
  registerDefaultPresets: function () {
    this.registerPreset("pop", {
      animation: {
        extraCssClasses: "dx-android-pop-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("openDoor", {
      animation: this._createOpenDoorConfig()
    });
    this.registerPreset("win-pop", {
      animation: this._createWinPopConfig()
    });
    this.registerPreset("fade", {
      animation: {
        extraCssClasses: "dx-fade-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("slide", {
      device: function () {
        return s.default.current().android || s.default.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(1, 1)
    });
    this.registerPreset("slide", {
      device: function () {
        return !s.default.current().android && !s.default.real.android;
      },
      animation: {
        extraCssClasses: "dx-slide-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-slide", {
      animation: {
        extraCssClasses: "dx-ios7-slide-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("overflow", {
      animation: {
        extraCssClasses: "dx-overflow-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-toolbar", {
      device: function () {
        return !s.default.current().android && !s.default.real.android;
      },
      animation: {
        extraCssClasses: "dx-ios7-toolbar-animation",
        delay: this.option("defaultAnimationDelay"),
        duration: this.option("defaultAnimationDuration")
      }
    });
    this.registerPreset("ios7-toolbar", {
      device: function () {
        return s.default.current().android || s.default.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(0, 0.4)
    });
    this.registerPreset("stagger-fade", {
      animation: {
        extraCssClasses: "dx-fade-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-slide", {
      animation: {
        extraCssClasses: "dx-slide-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-slide", {
      animation: {
        extraCssClasses: "dx-fade-slide-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-drop", {
      animation: {
        extraCssClasses: "dx-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-drop", {
      animation: {
        extraCssClasses: "dx-fade-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-rise", {
      animation: {
        extraCssClasses: "dx-fade-rise-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-3d-drop", {
      animation: {
        extraCssClasses: "dx-3d-drop-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
    this.registerPreset("stagger-fade-zoom", {
      animation: {
        extraCssClasses: "dx-fade-zoom-animation",
        staggerDelay: this.option("defaultStaggerAnimationDelay"),
        duration: this.option("defaultStaggerAnimationDuration"),
        delay: this.option("defaultStaggerAnimationStartDelay")
      }
    });
  }
});
exports.PresetCollection = c;
var h = new c();
exports.presets = h;