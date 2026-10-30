exports.default = undefined;
function n(e) {
  this._options = e || {};
  this._list = [];
  this._queue = [];
  this._firing = false;
  this._fired = false;
  this._firingIndexes = [];
}
n.prototype._fireCore = function (e, t) {
  var n = this._firingIndexes;
  var i = this._list;
  var o = this._options.stopOnFalse;
  var a = n.length;
  for (n[a] = 0; n[a] < i.length; n[a]++) {
    if (i[n[a]].apply(e, t) === false && o) {
      break;
    }
  }
  n.pop();
};
n.prototype.add = function (e) {
  if (typeof e == "function" && (!this._options.unique || !this.has(e))) {
    this._list.push(e);
  }
  return this;
};
n.prototype.remove = function (e) {
  var t = this._list;
  var n = this._firingIndexes;
  var i = t.indexOf(e);
  if (i > -1 && (t.splice(i, 1), this._firing && n.length)) {
    for (var o = 0; o < n.length; o++) {
      if (i <= n[o]) {
        n[o]--;
      }
    }
  }
  return this;
};
n.prototype.has = function (e) {
  var t = this._list;
  if (e) {
    return t.indexOf(e) > -1;
  } else {
    return !!t.length;
  }
};
n.prototype.empty = function (e) {
  this._list = [];
  return this;
};
n.prototype.fireWith = function (e, t) {
  var n = this._queue;
  t = (t = t || []).slice ? t.slice() : t;
  if (this._options.syncStrategy) {
    this._firing = true;
    this._fireCore(e, t);
  } else {
    n.push([e, t]);
    if (this._firing) {
      return;
    }
    for (this._firing = true; n.length;) {
      var i = n.shift();
      this._fireCore(i[0], i[1]);
    }
  }
  this._firing = false;
  this._fired = true;
  return this;
};
n.prototype.fire = function () {
  this.fireWith(this, arguments);
};
n.prototype.fired = function () {
  return this._fired;
};
function i(e) {
  return new n(e);
}
exports.default = i;
module.exports = exports.default;
module.exports.default = exports.default;