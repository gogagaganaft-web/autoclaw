exports.getRelativeOffset = function (e, t) {
  var n = {
    left: 0,
    top: 0
  };
  var i = t;
  while ((o = i) !== null && o !== undefined && o.offsetParent && !i.classList.contains(e)) {
    var o;
    var a = i.offsetParent;
    var r = i.getBoundingClientRect();
    var s = a.getBoundingClientRect();
    n.left += r.left - s.left;
    n.top += r.top - s.top;
    i = i.offsetParent;
  }
  return n;
};