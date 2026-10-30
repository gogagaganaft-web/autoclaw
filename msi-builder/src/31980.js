exports.MergedRangesManager = undefined;
var n = function () {
  function e(e, t) {
    this.dataProvider = e;
    this.worksheet = t;
    this.mergedCells = [];
    this.mergedRanges = [];
  }
  var t = e.prototype;
  t.updateMergedRanges = function (e, t, n, i) {
    if (i._isHeaderCell(t, n) && !this.isCellInMergedRanges(t, n)) {
      var o = this.dataProvider.getCellMerging(t, n);
      var a = o.rowspan;
      var r = o.colspan;
      if (r || a) {
        var s = i._allowToMergeRange(t, n, a, r);
        this.updateMergedCells(e, t, n, a, r);
        if (s) {
          var l = i._isInfoCell(t, n) && i._allowExportRowFieldHeaders();
          this.mergedRanges.push({
            masterCell: e,
            rowspan: a - (l && a > 0),
            colspan: r
          });
        }
      }
    }
  };
  t.isCellInMergedRanges = function (e, t) {
    return this.mergedCells[e] && this.mergedCells[e][t];
  };
  t.findMergedCellInfo = function (e, t, n) {
    if (n && this.isCellInMergedRanges(e, t)) {
      return this.mergedCells[e][t];
    }
  };
  t.updateMergedCells = function (e, t, n, i, o) {
    for (var a = t; a <= t + i; a++) {
      for (var r = n; r <= n + o; r++) {
        this.mergedCells[a] ||= [];
        this.mergedCells[a][r] = {
          masterCell: e
        };
      }
    }
  };
  t.addMergedRange = function (e, t, n) {
    this.mergedRanges.push({
      masterCell: e,
      rowspan: t,
      colspan: n
    });
  };
  t.applyMergedRages = function () {
    var e = this;
    this.mergedRanges.forEach(function (t) {
      var n = t.masterCell.fullAddress.row;
      var i = t.masterCell.fullAddress.col;
      var o = n + t.rowspan;
      var a = i + t.colspan;
      e.worksheet.mergeCells(n, i, o, a);
    });
  };
  return e;
}();
exports.MergedRangesManager = n;