exports.combineClasses = function (e) {
  return Object.keys(e).filter(function (t) {
    return e[t];
  }).join(" ");
};