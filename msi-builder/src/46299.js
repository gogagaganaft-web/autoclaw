exports.querySelectorInSameDocument = function (e, t) {
  var i;
  return (((i = e.getRootNode) === null || i === undefined ? undefined : i.call(e)) ?? document).querySelector(t);
};