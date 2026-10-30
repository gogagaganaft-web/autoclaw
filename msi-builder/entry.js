/**
 * Единая точка входа бандла MSI.
 * точка входа — модуль 16354.js:
 *   1) require("./2025.js")   — регистрирует ВСЕ виджеты в ui-неймспейс
 *   2) require("./66312.js")  — регистрирует viz-неймспейс (MSI.viz.dxChart, ...)
 *   3) module.exports = корневой объект MSI (он же window.MSI)
 * Этот файл отдаёт полноценный объект MSI (MSI.ui, MSI.viz, MSI.data и т.д.),
 */
var root = require("./src/16354.js");
module.exports = root;
