const STORAGE_KEY = 'goreport_stats';
const MAX_ENTRIES = 50;

function formatFilterValue(val) {
    if (typeof val === 'number' || typeof val === 'string') {
        var s = String(val);
        // YYYYMMDD → DD.MM.YYYY
        if (/^\d{8}$/.test(s)) {
            return s.substring(6,8) + '.' + s.substring(4,6) + '.' + s.substring(0,4);
        }
        // YYYYMM → month-year
        if (/^\d{6}$/.test(s) && parseInt(s.substring(0,4)) > 2000) {
            var months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
            var m = parseInt(s.substring(4,6)) - 1;
            var y = s.substring(0,4);
            return months[m] + '.' + y;
        }
    }
    return String(val);
}

function serializeFilters(params) {
    if (!params) return '';
    var parts = [];

    // Сначала displayText (читаемые названия)
    for (var key in params) {
        if (!params.hasOwnProperty(key)) continue;
        if (key.indexOf('_displayData') !== -1) continue;
        var match = key.match(/^(.+)_displayText$/);
        if (match) {
            var val = params[key];
            if (val && String(val).trim()) {
                parts.push(match[1] + ': ' + String(val).trim().substring(0, 80));
            }
        }
    }

    // Для полей без displayText — показать значение
    var doneKeys = {};
    for (var key in params) {
        if (!params.hasOwnProperty(key)) continue;
        var baseKey = key.replace(/_displayText$|_displayData$/, '');
        if (doneKeys[baseKey]) continue;
        if (key.indexOf('_displayText') !== -1 || key.indexOf('_displayData') !== -1) continue;

        var val = params[key];
        if (val === null || val === undefined) continue;

        var already = false;
        for (var p = 0; p < parts.length; p++) {
            if (parts[p].indexOf(baseKey + ': ') === 0) { already = true; break; }
        }
        if (already) { doneKeys[baseKey] = true; continue; }

        if (Array.isArray(val)) {
            if (val.length > 3) {
                parts.push(baseKey + ': ' + val.length);
            } else {
                var formattedVals = [];
                for (var vi = 0; vi < val.length; vi++) {
                    formattedVals.push(formatFilterValue(val[vi]));
                }
                var joined = formattedVals.join(', ');
                if (formattedVals.length === 2 && formattedVals[0] !== formattedVals[1]) {
                    joined = formattedVals[0] + '-' + formattedVals[1];
                }
                parts.push(baseKey + ': ' + joined);
            }
        } else {
            parts.push(baseKey + ': ' + String(val).substring(0, 30));
        }
        doneKeys[baseKey] = true;
    }
    return parts.join(', ');
}

function loadAll() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveAll(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('ReportStats: localStorage full, clearing old data');
        localStorage.removeItem(STORAGE_KEY);
    }
}

export function saveStats(reportId, reportName, params, durationMs, rows) {
    if (!reportId) return;
    var all = loadAll();
    if (!all[reportId]) all[reportId] = [];
    all[reportId].push({
        ts: new Date().toISOString(),
        reportName: reportName || '',
        filters: serializeFilters(params),
        durationMs: durationMs,
        rows: rows || 0
    });
    if (all[reportId].length > MAX_ENTRIES) {
        all[reportId] = all[reportId].slice(-MAX_ENTRIES);
    }
    saveAll(all);
}

export function getStats(reportId) {
    if (!reportId) return [];
    var all = loadAll();
    return all[reportId] || [];
}

export function getSummary(reportId) {
    var stats = getStats(reportId);
    if (stats.length === 0) return null;
    var totalMs = 0;
    for (var i = 0; i < stats.length; i++) {
        totalMs += stats[i].durationMs;
    }
    var last = stats[stats.length - 1];
    var lastDate = new Date(last.ts);
    var dateStr = lastDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    return {
        avgMs: Math.round(totalMs / stats.length),
        avgSec: (totalMs / stats.length / 1000).toFixed(1),
        count: stats.length,
        lastSec: (last.durationMs / 1000).toFixed(1),
        lastDate: dateStr
    };
}

export function clearStats(reportId) {
    if (!reportId) return;
    var all = loadAll();
    delete all[reportId];
    saveAll(all);
}
