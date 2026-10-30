exports.default = undefined;
var n = "#ffffff";
var i = [{
  theme: {
    name: "generic.dark",
    font: {
      color: "#808080"
    },
    backgroundColor: "#2a2a2a",
    primaryTitleColor: "#dedede",
    secondaryTitleColor: "#a3a3a3",
    gridColor: "#555555",
    axisColor: "#a3a3a3",
    export: {
      backgroundColor: "#2a2a2a",
      font: {
        color: "#dbdbdb"
      },
      button: {
        default: {
          color: "#dedede",
          borderColor: "#4d4d4d",
          backgroundColor: "#2e2e2e"
        },
        hover: {
          color: "#dedede",
          borderColor: "#6c6c6c",
          backgroundColor: "#444"
        },
        focus: {
          color: "#dedede",
          borderColor: "#8d8d8d",
          backgroundColor: "#444444"
        },
        active: {
          color: "#dedede",
          borderColor: "#8d8d8d",
          backgroundColor: "#555555"
        }
      },
      shadowColor: "#292929"
    },
    tooltip: {
      color: "#2b2b2b",
      border: {
        color: "#494949"
      },
      font: {
        color: "#929292"
      }
    },
    "chart:common": {
      commonSeriesSettings: {
        label: {
          border: {
            color: "#494949"
          }
        },
        valueErrorBar: {
          color: n
        }
      }
    },
    "chart:common:axis": {
      constantLineStyle: {
        color: n
      }
    },
    "chart:common:annotation": {
      font: {
        color: "#929292"
      },
      border: {
        color: "#494949"
      },
      color: "#2b2b2b",
      shadow: {
        opacity: 0.008,
        offsetY: 4,
        blur: 8
      }
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
          color: n
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
          color: n,
          opacity: 0.32
        },
        minorTick: {
          color: n,
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
          color: "#303030"
        }
      },
      sliderHandle: {
        color: n,
        opacity: 0.2
      },
      shutter: {
        color: "#2b2b2b",
        opacity: 0.9
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
            color: n
          }
        }
      },
      "layer:area": {
        borderColor: "#303030",
        color: "#686868",
        hoveredBorderColor: n,
        selectedBorderColor: n
      },
      "layer:line": {
        color: "#c77244",
        hoveredColor: "#ff5d04",
        selectedColor: "#ff784f"
      },
      "layer:marker:bubble": {
        hoveredBorderColor: n,
        selectedBorderColor: n
      },
      "layer:marker:pie": {
        hoveredBorderColor: n,
        selectedBorderColor: n
      },
      legend: {
        border: {
          color: "#3f3f3f"
        },
        font: {
          color: n
        }
      },
      controlBar: {
        borderColor: "#c7c7c7",
        color: "#303030"
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
      pointColor: "#303030"
    },
    bullet: {
      targetColor: "#8e8e8e"
    },
    funnel: {
      item: {
        border: {
          color: "#2a2a2a"
        }
      }
    },
    sankey: {
      label: {
        font: {
          color: n
        },
        shadow: {
          opacity: 0
        }
      },
      node: {
        border: {
          color: "#2a2a2a"
        }
      },
      link: {
        color: "#888888",
        border: {
          color: "#2a2a2a"
        },
        hoverStyle: {
          color: "#bbbbbb"
        }
      }
    }
  },
  baseThemeName: "generic.light"
}, {
  theme: {
    name: "generic.dark.compact"
  },
  baseThemeName: "generic.dark"
}];
exports.default = i;
module.exports = exports.default;
module.exports.default = exports.default;