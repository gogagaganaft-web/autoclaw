Object.defineProperty(exports, "__esModule", {
  value: true
});
var n = function () {
  function e(e, t) {
    this.dependency = t;
    this.effect = e;
    this.destroy = e();
  }
  e.prototype.update = function (e) {
    var t = this.dependency;
    if (e) {
      this.dependency = e;
    }
    if (!e || !!e.some(function (e, n) {
      return t[n] !== e;
    })) {
      this.dispose();
      this.destroy = this.effect();
    }
  };
  e.prototype.dispose = function () {
    if (this.destroy) {
      this.destroy();
    }
  };
  return e;
}();
exports.InfernoEffect = n;