exports.Translator1D = i;
var n = Number;
function i() {
  this.setDomain(arguments[0], arguments[1]).setCodomain(arguments[2], arguments[3]).setInverted(false);
}
i.prototype = {
  constructor: i,
  setDomain: function (e, t) {
    this._domain1 = n(e);
    this._domain2 = n(t);
    this._domainDelta = this._domain2 - this._domain1;
    return this;
  },
  setCodomain: function (e, t) {
    this._codomain1 = n(e);
    this._codomain2 = n(t);
    this._codomainDelta = this._codomain2 - this._codomain1;
    return this;
  },
  setInverted: function (e) {
    this.inverted = e;
  },
  getDomain: function () {
    return [this._domain1, this._domain2];
  },
  getCodomain: function () {
    return [this._codomain1, this._codomain2];
  },
  getDomainStart: function () {
    return this._domain1;
  },
  getDomainEnd: function () {
    return this._domain2;
  },
  getCodomainStart: function () {
    return this._codomain1;
  },
  getCodomainEnd: function () {
    return this._codomain2;
  },
  getDomainRange: function () {
    return this._domainDelta;
  },
  getCodomainRange: function () {
    return this._codomainDelta;
  },
  translate: function (e) {
    var t = (n(e) - this._domain1) / this._domainDelta;
    if (this.inverted) {
      t = 1 - t;
    }
    if (t >= 0 && t <= 1) {
      return this._codomain1 + t * this._codomainDelta;
    } else {
      return NaN;
    }
  },
  adjust: function (e) {
    var t = (n(e) - this._domain1) / this._domainDelta;
    var i = NaN;
    if (t < 0) {
      i = this._domain1;
    } else if (t > 1) {
      i = this._domain2;
    } else if (t >= 0 && t <= 1) {
      i = n(e);
    }
    return i;
  }
};