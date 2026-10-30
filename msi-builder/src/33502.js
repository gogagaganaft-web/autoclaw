exports.shallowEquals = undefined;
exports.shallowEquals = function (e, t) {
  return Object.keys(e).length === Object.keys(t).length && Object.keys(e).every(function (n) {
    return e[n] === t[n];
  });
};