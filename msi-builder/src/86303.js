exports.Semaphore = undefined;
var n = function () {
  function e() {
    this.counter = 0;
  }
  var t = e.prototype;
  t.isFree = function () {
    return this.counter === 0;
  };
  t.take = function () {
    this.counter += 1;
  };
  t.release = function () {
    this.counter -= 1;
    if (this.counter < 0) {
      this.counter = 0;
    }
  };
  return e;
}();
exports.Semaphore = n;