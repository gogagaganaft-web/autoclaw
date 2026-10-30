exports.hideCallback = undefined;
var n;
n = [];
var i = {
  add: function (e) {
    if (!n.includes(e)) {
      n.push(e);
    }
  },
  remove: function (e) {
    var t = n.indexOf(e);
    if (t !== -1) {
      n.splice(t, 1);
    }
  },
  fire: function () {
    var e = n.pop();
    var t = !!e;
    if (t) {
      e();
    }
    return t;
  },
  hasCallback: function () {
    return n.length > 0;
  }
};
exports.hideCallback = i;