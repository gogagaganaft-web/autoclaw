exports.getMemoizeScrollTo = function (e) {
  var t = e();
  var n = {};
  return function (e, i = false) {
    var o = {
      top: e.top !== undefined ? Math.ceil(e.top) : undefined,
      left: e.left !== undefined ? Math.ceil(e.left) : undefined
    };
    var a = o.top === n.top && o.left === n.left;
    if (!!i || !a) {
      n = o;
      t.scrollTo(e);
    }
  };
};