exports.stubComponent = function (e) {
  return function () {
    function t() {
      throw new Error(`Module '${e}' not found`);
    }
    t.getInstance = function () {};
    return t;
  }();
};