(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["graphs"],{

/***/ "./CTFd/themes/core/assets/js/graphs.js":
/*!**********************************************!*\
  !*** ./CTFd/themes/core/assets/js/graphs.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createGraph = createGraph;\nexports.updateGraph = updateGraph;\n\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\n\nvar _plotly = _interopRequireDefault(__webpack_require__(/*! plotly.js-basic-dist */ \"./node_modules/plotly.js-basic-dist/plotly-basic.js\"));\n\nvar _moment = _interopRequireDefault(__webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\"));\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./CTFd/themes/core/assets/js/utils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar graph_configs = {\n  score_graph: {\n    layout: {\n      title: \"Score over Time\",\n      paper_bgcolor: \"rgba(0,0,0,0)\",\n      plot_bgcolor: \"rgba(0,0,0,0)\",\n      hovermode: \"closest\",\n      xaxis: {\n        showgrid: false,\n        showspikes: true\n      },\n      yaxis: {\n        showgrid: false,\n        showspikes: true\n      },\n      legend: {\n        orientation: \"h\"\n      }\n    },\n    fn: function fn(type, id, name, account_id) {\n      return \"CTFd_score_\".concat(type, \"_\").concat(name, \"_\").concat(id, \"_\").concat(new Date().toISOString().slice(0, 19));\n    },\n    format: function format(type, id, name, account_id, responses) {\n      var times = [];\n      var scores = [];\n      var solves = responses[0].data;\n      var awards = responses[2].data;\n      var total = solves.concat(awards);\n      total.sort(function (a, b) {\n        return new Date(a.date) - new Date(b.date);\n      });\n\n      for (var i = 0; i < total.length; i++) {\n        var date = (0, _moment.default)(total[i].date);\n        times.push(date.toDate());\n\n        try {\n          scores.push(total[i].challenge.value);\n        } catch (e) {\n          scores.push(total[i].value);\n        }\n      }\n\n      return [{\n        x: times,\n        y: (0, _utils.cumulativeSum)(scores),\n        type: \"scatter\",\n        marker: {\n          color: (0, _utils.colorHash)(name + id)\n        },\n        line: {\n          color: (0, _utils.colorHash)(name + id)\n        },\n        fill: \"tozeroy\"\n      }];\n    }\n  },\n  category_breakdown: {\n    layout: {\n      title: \"Category Breakdown\",\n      paper_bgcolor: \"rgba(0,0,0,0)\",\n      plot_bgcolor: \"rgba(0,0,0,0)\",\n      legend: {\n        orientation: \"v\"\n      },\n      height: \"400px\"\n    },\n    fn: function fn(type, id, name, account_id) {\n      return \"CTFd_submissions_\".concat(type, \"_\").concat(name, \"_\").concat(id, \"_\").concat(new Date().toISOString().slice(0, 19));\n    },\n    format: function format(type, id, name, account_id, responses) {\n      var solves = responses[0].data;\n      var categories = [];\n\n      for (var i = 0; i < solves.length; i++) {\n        categories.push(solves[i].challenge.category);\n      }\n\n      var keys = categories.filter(function (elem, pos) {\n        return categories.indexOf(elem) == pos;\n      });\n      var counts = [];\n\n      for (var _i = 0; _i < keys.length; _i++) {\n        var count = 0;\n\n        for (var x = 0; x < categories.length; x++) {\n          if (categories[x] == keys[_i]) {\n            count++;\n          }\n        }\n\n        counts.push(count);\n      }\n\n      return [{\n        values: counts,\n        labels: keys,\n        hole: 0.4,\n        type: \"pie\"\n      }];\n    }\n  },\n  solve_percentages: {\n    layout: {\n      title: \"Solve Percentages\",\n      paper_bgcolor: \"rgba(0,0,0,0)\",\n      plot_bgcolor: \"rgba(0,0,0,0)\",\n      legend: {\n        orientation: \"h\"\n      },\n      height: \"400px\"\n    },\n    fn: function fn(type, id, name, account_id) {\n      return \"CTFd_submissions_\".concat(type, \"_\").concat(name, \"_\").concat(id, \"_\").concat(new Date().toISOString().slice(0, 19));\n    },\n    format: function format(type, id, name, account_id, responses) {\n      var solves_count = responses[0].data.length;\n      var fails_count = responses[1].meta.count;\n      return [{\n        values: [solves_count, fails_count],\n        labels: [\"Solves\", \"Fails\"],\n        marker: {\n          colors: [\"rgb(0, 209, 64)\", \"rgb(207, 38, 0)\"]\n        },\n        hole: 0.4,\n        type: \"pie\"\n      }];\n    }\n  }\n};\nvar config = {\n  displaylogo: false,\n  responsive: true\n};\n\nfunction createGraph(graph_type, target, data, type, id, name, account_id) {\n  var cfg = graph_configs[graph_type];\n  var $elem = (0, _jquery.default)(target);\n  $elem.empty();\n\n  if ($elem[0] === undefined) {\n    console.log(\"Couldn't find graph target: \" + target);\n    return;\n  }\n\n  $elem[0].fn = cfg.fn(type, id, name, account_id);\n  var graph_data = cfg.format(type, id, name, account_id, data);\n\n  _plotly.default.newPlot($elem[0], graph_data, cfg.layout, config);\n}\n\nfunction updateGraph(graph_type, target, data, type, id, name, account_id) {\n  var cfg = graph_configs[graph_type];\n  var $elem = (0, _jquery.default)(target);\n  var graph_data = cfg.format(type, id, name, account_id, data);\n\n  _plotly.default.update($elem[0], graph_data, cfg.layout, config);\n}\n\n//# sourceURL=webpack:///./CTFd/themes/core/assets/js/graphs.js?");

/***/ })

}]);