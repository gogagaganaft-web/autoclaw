exports.default = undefined;
var n = "'Roboto', 'RobotoFallback', 'Helvetica', 'Arial', sans-serif";
var i = "#ffffff";
var o = [{
  theme: {
    name: "material",
    defaultPalette: "Material",
    font: {
      family: n
    },
    title: {
      margin: {
        top: 20,
        bottom: 20,
        left: 0,
        right: 0
      },
      font: {
        size: 20,
        family: n,
        weight: 500
      },
      horizontalAlignment: "left",
      subtitle: {
        font: {
          size: 14
        },
        horizontalAlignment: "left"
      }
    },
    tooltip: {
      shadow: {
        opacity: 0
      },
      border: {
        visible: false
      },
      paddingLeftRight: 8,
      paddingTopBottom: 6,
      arrowLength: 0,
      location: "edge",
      color: "#616161",
      font: {
        color: i
      },
      cornerRadius: 4
    },
    chart: {
      commonAxisSettings: {
        minorTick: {
          opacity: 0.5
        },
        label: {
          font: {
            size: 11
          }
        }
      },
      commonAnnotationSettings: {
        font: {
          color: i
        },
        border: {
          color: "#616161"
        },
        color: "#616161",
        arrowLength: 14,
        arrowWidth: 0,
        shadow: {
          opacity: 0.08,
          offsetY: 4,
          blur: 8
        },
        cornerRadius: 4
      }
    },
    pie: {
      title: {
        horizontalAlignment: "center",
        subtitle: {
          horizontalAlignment: "center"
        }
      }
    },
    polar: {
      commonAxisSettings: {
        minorTick: {
          opacity: 0.5
        }
      },
      title: {
        horizontalAlignment: "center",
        subtitle: {
          horizontalAlignment: "center"
        }
      }
    },
    funnel: {
      title: {
        horizontalAlignment: "center",
        subtitle: {
          horizontalAlignment: "center"
        }
      }
    },
    gauge: {
      title: {
        horizontalAlignment: "center",
        subtitle: {
          horizontalAlignment: "center"
        }
      }
    },
    barGauge: {
      title: {
        horizontalAlignment: "center",
        subtitle: {
          horizontalAlignment: "center"
        }
      }
    },
    rangeSelector: {
      sliderHandle: {
        opacity: 0.5
      }
    },
    treeMap: {
      group: {
        label: {
          font: {
            weight: 500
          }
        }
      }
    }
  },
  baseThemeName: "generic.light"
}, {
  theme: {
    name: "material.light",
    gridColor: "#e0e0e0",
    axisColor: "rgba(0,0,0,0.54)",
    primaryTitleColor: "rgba(0,0,0,0.87)",
    legend: {
      font: {
        color: "rgba(0,0,0,0.54)"
      }
    },
    chart: {
      scrollBar: {
        color: "#bfbfbf",
        opacity: 0.7
      }
    },
    gauge: {
      rangeContainer: {
        backgroundColor: "rgba(0,0,0,0.2)"
      }
    },
    barGauge: {
      backgroundColor: "#efefef"
    }
  },
  baseThemeName: "material"
}, {
  theme: {
    name: "material.dark",
    gridColor: "#515159",
    backgroundColor: "#363640",
    axisColor: "rgba(255,255,255,0.54)",
    font: {
      color: "rgba(255,255,255,0.54)"
    },
    primaryTitleColor: "rgba(255,255,255,0.87)",
    secondaryTitleColor: "rgba(255,255,255,0.87)",
    tooltip: {
      color: "#000"
    },
    export: {
      backgroundColor: "#363640",
      font: {
        color: "#dbdbdb"
      },
      button: {
        default: {
          color: "#dedede",
          borderColor: "#4d4d4d",
          backgroundColor: "#363640"
        },
        hover: {
          color: "#dedede",
          borderColor: "#6c6c6c",
          backgroundColor: "#3f3f4b"
        },
        focus: {
          color: "#dedede",
          borderColor: "#8d8d8d",
          backgroundColor: "#494956"
        },
        active: {
          color: "#dedede",
          borderColor: "#8d8d8d",
          backgroundColor: "#494956"
        }
      },
      shadowColor: "#292929"
    },
    "chart:common": {
      commonSeriesSettings: {
        label: {
          border: {
            color: "#494949"
          }
        },
        valueErrorBar: {
          color: i
        }
      }
    },
    "chart:common:axis": {
      constantLineStyle: {
        color: i
      }
    },
    "chart:common:annotation": {
      border: {
        color: "#000"
      },
      color: "#000"
    },
    chart: {
      commonPaneSettings: {
        border: {
          color: "#494949"
        }
      },
      commonAxisSettings: {
        breakStyle: {
          color: "#818181"
        }
      },
      zoomAndPan: {
        dragBoxStyle: {
          color: i
        }
      }
    },
    gauge: {
      rangeContainer: {
        backgroundColor: "#b5b5b5"
      },
      valueIndicators: {
        _default: {
          color: "#b5b5b5"
        },
        rangebar: {
          color: "#84788b"
        },
        twocolorneedle: {
          secondColor: "#ba544d"
        },
        trianglemarker: {
          color: "#b7918f"
        },
        textcloud: {
          color: "#ba544d"
        }
      }
    },
    barGauge: {
      backgroundColor: "#3c3c3c"
    },
    rangeSelector: {
      scale: {
        tick: {
          color: i,
          opacity: 0.32
        },
        minorTick: {
          color: i,
          opacity: 0.1
        },
        breakStyle: {
          color: "#818181"
        }
      },
      selectedRangeColor: "#b5b5b5",
      sliderMarker: {
        color: "#b5b5b5",
        font: {
          color: "#363640"
        }
      },
      sliderHandle: {
        color: i,
        opacity: 0.2
      },
      shutter: {
        color: i,
        opacity: 0.1
      }
    },
    map: {
      background: {
        borderColor: "#3f3f3f"
      },
      layer: {
        label: {
          stroke: "#000000",
          font: {
            color: i
          }
        }
      },
      "layer:area": {
        borderColor: "#363640",
        color: "#686868",
        hoveredBorderColor: i,
        selectedBorderColor: i
      },
      "layer:line": {
        color: "#c77244",
        hoveredColor: "#ff5d04",
        selectedColor: "#ff784f"
      },
      "layer:marker:bubble": {
        hoveredBorderColor: i,
        selectedBorderColor: i
      },
      "layer:marker:pie": {
        hoveredBorderColor: i,
        selectedBorderColor: i
      },
      legend: {
        border: {
          color: "#3f3f3f"
        },
        font: {
          color: i
        }
      },
      controlBar: {
        borderColor: "#c7c7c7",
        color: "#363640"
      }
    },
    treeMap: {
      group: {
        color: "#4c4c4c",
        label: {
          font: {
            color: "#a3a3a3"
          }
        }
      }
    },
    sparkline: {
      lineColor: "#c7c7c7",
      firstLastColor: "#c7c7c7",
      barPositiveColor: "#b8b8b8",
      barNegativeColor: "#8e8e8e",
      winColor: "#b8b8b8",
      lossColor: "#8e8e8e",
      pointColor: "#363640"
    },
    bullet: {
      targetColor: "#8e8e8e"
    },
    funnel: {
      item: {
        border: {
          color: "#363640"
        }
      }
    },
    sankey: {
      label: {
        font: {
          color: i
        }
      }
    }
  },
  baseThemeName: "material"
}];
function a(e, t, n) {
  return {
    theme: {
      name: "material." + e + "." + t,
      rangeSelector: {
        selectedRangeColor: n,
        sliderMarker: {
          color: n
        },
        sliderHandle: {
          color: n
        }
      },
      map: {
        "layer:marker:dot": {
          color: n
        },
        "layer:marker:bubble": {
          color: n
        },
        legend: {
          markerColor: n
        }
      },
      bullet: {
        color: n
      },
      gauge: {
        valueIndicators: {
          rangebar: {
            color: n
          },
          textcloud: {
            color: n
          }
        }
      }
    },
    baseThemeName: "material." + t
  };
}
var r = {
  blue: "#03a9f4",
  lime: "#cddc39",
  orange: "#ff5722",
  purple: "#9c27b0",
  teal: "#009688"
};
for (var s in r) {
  if (Object.prototype.hasOwnProperty.call(r, s)) {
    var l = r[s];
    o.push(a(s, "light", l), a(s, "dark", l), {
      theme: {
        name: `material.${s}.light.compact`
      },
      baseThemeName: `material.${s}.light`
    }, {
      theme: {
        name: `material.${s}.dark.compact`
      },
      baseThemeName: `material.${s}.dark`
    });
  }
}
var u = o;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;