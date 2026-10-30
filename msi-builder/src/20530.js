exports.default = undefined;
var i = require("./58664.js");
var o = _(require("./68374.js"));
var a = require("./58201.js");
var r = require("./13306.js");
var s = require("./35922.js");
var l = require("./95479.js");
var u = _(require("./17381.js"));
var d = _(require("./44504.js"));
var c = _(require("./24311.js"));
var h = _(require("./55814.js"));
var f = require("./80566.js");
var p = require("./36613.js");
var g = require("./77695.js");
var m = _(require("./80209.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = (0, a.getNavigator)();
var y = (0, a.getWindow)();
var b = {
  iPhone: "iPhone",
  iPhone5: "iPhone",
  iPhone6: "iPhone",
  iPhone6plus: "iPhone",
  iPad: "iPad",
  iPadMini: "iPad Mini",
  androidPhone: "Android Mobile",
  androidTablet: "Android",
  msSurface: "Windows ARM Tablet PC",
  desktop: "desktop"
};
var x = {
  deviceType: "desktop",
  platform: "generic",
  version: [],
  phone: false,
  tablet: false,
  android: false,
  ios: false,
  generic: true,
  grade: "A",
  mac: false
};
var w = {
  generic: function (e) {
    var t = /windows phone/i.test(e) || e.match(/WPDesktop/);
    var n = !t && /Windows(.*)arm(.*)Tablet PC/i.test(e);
    var i = !t && !n && /msapphost/i.test(e);
    var o = /((intel|ppc) mac os x)/.test(e.toLowerCase());
    if (t || n || i || o) {
      return {
        deviceType: t ? "phone" : n ? "tablet" : "desktop",
        platform: "generic",
        version: [],
        grade: "A",
        mac: o
      };
    }
  },
  ios: function (e) {
    if (/ip(hone|od|ad)/i.test(e)) {
      var t = /ip(hone|od)/i.test(e);
      var n = e.match(/os (\d+)_(\d+)_?(\d+)?/i);
      return {
        deviceType: t ? "phone" : "tablet",
        platform: "ios",
        version: n ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3] || 0, 10)] : [],
        grade: y.screen.height === 480 ? "B" : "A"
      };
    }
  },
  android: function (e) {
    if (/android|htc_|silk/i.test(e)) {
      var t = /mobile/i.test(e);
      var n = e.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
      var i = n ? [parseInt(n[1], 10), parseInt(n[2] || 0, 10), parseInt(n[3] || 0, 10)] : [];
      return {
        deviceType: t ? "phone" : "tablet",
        platform: "android",
        version: i,
        grade: i.length > 1 && (i[0] < 4 || i[0] === 4 && i[1] < 4) ? "B" : "A"
      };
    }
  }
};
var C = new (function () {
  function e(e) {
    this._window = (e == null ? undefined : e.window) || y;
    this._realDevice = this._getDevice();
    this._currentDevice = undefined;
    this._currentOrientation = undefined;
    this._eventsStrategy = new f.EventsStrategy(this);
    this.changed = (0, d.default)();
    if ((0, a.hasWindow)()) {
      c.default.add(this._recalculateOrientation.bind(this));
      h.default.add(this._recalculateOrientation.bind(this));
    }
  }
  var t = e.prototype;
  t.current = function (e) {
    if (e) {
      this._currentDevice = this._getDevice(e);
      this._forced = true;
      this.changed.fire();
      return;
    }
    if (!this._currentDevice) {
      e = undefined;
      try {
        e = this._getDeviceOrNameFromWindowScope();
      } catch (t) {
        e = this._getDeviceNameFromSessionStorage();
      } finally {
        e ||= this._getDeviceNameFromSessionStorage();
        if (e) {
          this._forced = true;
        }
      }
      this._currentDevice = this._getDevice(e);
    }
    return this._currentDevice;
  };
  t.real = function (e) {
    return (0, r.extend)({}, this._realDevice);
  };
  t.orientation = function () {
    return this._currentOrientation;
  };
  t.isForced = function () {
    return this._forced;
  };
  t.isRippleEmulator = function () {
    return !!this._window.tinyHippos;
  };
  t._getCssClasses = function (e) {
    var t = [];
    var n = this._realDevice;
    if ((e = e || this.current()).deviceType) {
      t.push(`dx-device-${e.deviceType}`);
      if (e.deviceType !== "desktop") {
        t.push("dx-device-mobile");
      }
    }
    t.push(`dx-device-${n.platform}`);
    if (n.version && n.version.length) {
      t.push(`dx-device-${n.platform}-${n.version[0]}`);
    }
    if (this.isSimulator()) {
      t.push("dx-simulator");
    }
    if ((0, m.default)().rtlEnabled) {
      t.push("dx-rtl");
    }
    return t;
  };
  t.attachCssClasses = function (e, t) {
    this._deviceClasses = this._getCssClasses(t).join(" ");
    (0, o.default)(e).addClass(this._deviceClasses);
  };
  t.detachCssClasses = function (e) {
    (0, o.default)(e).removeClass(this._deviceClasses);
  };
  t.isSimulator = function () {
    try {
      return this._isSimulator || (0, a.hasWindow)() && this._window.top !== this._window.self && this._window.top["dx-force-device"] || this.isRippleEmulator();
    } catch (e) {
      return false;
    }
  };
  t.forceSimulator = function () {
    this._isSimulator = true;
  };
  t._getDevice = function (e) {
    if (e === "genericPhone") {
      e = {
        deviceType: "phone",
        platform: "generic",
        generic: true
      };
    }
    if ((0, s.isPlainObject)(e)) {
      return this._fromConfig(e);
    }
    var t;
    if (e) {
      if (!(t = b[e])) {
        throw u.default.Error("E0005");
      }
    } else {
      t = v.userAgent;
    }
    return this._fromUA(t);
  };
  t._getDeviceOrNameFromWindowScope = function () {
    var e;
    if ((0, a.hasWindow)() && (this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"])) {
      e = this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"];
    }
    return e;
  };
  t._getDeviceNameFromSessionStorage = function () {
    var e = (0, p.sessionStorage)();
    if (e) {
      var t = e.getItem("dx-force-device");
      try {
        return JSON.parse(t);
      } catch (e) {
        return t;
      }
    }
  };
  t._fromConfig = function (e) {
    var t = (0, r.extend)({}, x, this._currentDevice, e);
    var n = {
      phone: t.deviceType === "phone",
      tablet: t.deviceType === "tablet",
      android: t.platform === "android",
      ios: t.platform === "ios",
      generic: t.platform === "generic"
    };
    return (0, r.extend)(t, n);
  };
  t._fromUA = function (e) {
    var t;
    (0, l.each)(w, function (n, i) {
      return !(t = i(e));
    });
    if (t) {
      return this._fromConfig(t);
    } else {
      return x;
    }
  };
  t._changeOrientation = function () {
    var e = (0, o.default)(this._window);
    var t = (0, i.getHeight)(e) > (0, i.getWidth)(e) ? "portrait" : "landscape";
    if (this._currentOrientation !== t) {
      this._currentOrientation = t;
      this._eventsStrategy.fireEvent("orientationChanged", [{
        orientation: t
      }]);
    }
  };
  t._recalculateOrientation = function () {
    var e = (0, i.getWidth)(this._window);
    if (this._currentWidth !== e) {
      this._currentWidth = e;
      this._changeOrientation();
    }
  };
  t.on = function (e, t) {
    this._eventsStrategy.on(e, t);
    return this;
  };
  t.off = function (e, t) {
    this._eventsStrategy.off(e, t);
    return this;
  };
  return e;
}())();
var S = (0, g.value)();
if (S) {
  C.attachCssClasses(S);
}
g.changeCallback.add(function (e, t) {
  C.detachCssClasses(t);
  C.attachCssClasses(e);
});
var k = C;
exports.default = k;
module.exports = exports.default;
module.exports.default = exports.default;