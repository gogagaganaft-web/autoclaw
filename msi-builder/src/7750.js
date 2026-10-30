function n(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
exports.calculateValuesFittedWidth = function (e, t) {
  return e + Math.max.apply(Math, (i = t, function (e) {
    if (Array.isArray(e)) {
      return n(e);
    }
  }(i) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(i) || function (e, t) {
    if (e) {
      if (typeof e == "string") {
        return n(e, t);
      }
      var i = Object.prototype.toString.call(e).slice(8, -1);
      if (i === "Object" && e.constructor) {
        i = e.constructor.name;
      }
      if (i === "Map" || i === "Set") {
        return Array.from(e);
      } else if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) {
        return n(e, t);
      } else {
        return undefined;
      }
    }
  }(i) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }())).toString().length * 10;
  var i;
};
exports.oneDigitWidth = undefined;
exports.oneDigitWidth = 10;