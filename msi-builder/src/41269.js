exports.updateRowsAndCellsHeights = function (e, t) {
  var n = function (e, t) {
    var n = Array.from({
      length: t.length
    }, function () {
      return 0;
    });
    s(t).forEach(function (a) {
      a.cells.filter(function (e) {
        return (0, i.isDefined)(e.rowSpan);
      }).forEach(function (i) {
        var r = (0, o.calculateTargetRectWidth)(i.pdfCell._rect.w, i.pdfCell.padding);
        var s = (0, o.calculateTextHeight)(e, i.pdfCell.text, i.pdfCell.font, {
          wordWrapEnabled: i.pdfCell.wordWrapEnabled,
          targetRectWidth: r
        }) + i.pdfCell.padding.top + i.pdfCell.padding.bottom;
        var l = i.rowSpan + 1;
        var u = t.slice(a.rowIndex, a.rowIndex + l).reduce(function (e, t) {
          return e + t.height + n[t.rowIndex];
        }, 0);
        if (s > u) {
          var d = (s - u) / l;
          for (var c = a.rowIndex; c < a.rowIndex + l; c++) {
            n[c] += d;
          }
        }
      });
    });
    return n;
  }(e, t);
  t.forEach(function (e) {
    e.height += n[e.rowIndex];
  });
  t.forEach(function (e) {
    e.cells.forEach(function (n) {
      var o = (n.rowSpan ?? 0) + 1;
      n.pdfCell._rect.h = t.slice(e.rowIndex, e.rowIndex + o).reduce(function (e, t) {
        return e + t.height;
      }, 0);
    });
  });
};
var i = require("./35922.js");
var o = require("./79262.js");
function a(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return r(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return r(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return r(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function s(e) {
  function t(e) {
    var t = e.cells.map(function (e) {
      return e.rowSpan ?? 0;
    });
    return Math.max.apply(Math, a(t));
  }
  return a(e).sort(function (e, n) {
    var i = t(e);
    var o = t(n);
    if (i > o) {
      return 1;
    } else if (o > i) {
      return -1;
    } else {
      return 0;
    }
  });
}