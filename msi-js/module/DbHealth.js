// DbHealth.js — стартовая диагностика БД.
// Запрашивает /api/db-status на сервере 7501 и выводит результат
// стандартным способом приложения — DevExpress.ui.notify (dxToast).
const DB_HEALTH_TIMEOUT_MS = 20000;

async function checkDbHealth(apiBase) {
    var url = (apiBase || '') + '/api/db-status';
    var ctrl = new AbortController();
    var timer = setTimeout(function() { ctrl.abort(); }, DB_HEALTH_TIMEOUT_MS);
    try {
        var resp = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        var data = await resp.json();
        return data;
    } finally {
        clearTimeout(timer);
    }
}

function shortError(err) {
    if (!err) return '';
    var s = String(err);
    if (s.length > 120) s = s.substring(0, 117) + '...';
    return s;
}

function toast(message, type, duration) {
    if (typeof DevExpress !== 'undefined' && DevExpress.ui && DevExpress.ui.notify) {
        var instance = DevExpress.ui.notify(message, type, duration, {
            position: { my: 'center bottom', at: 'center bottom', of: window },
            direction: 'up-push',
            closeOnClick: true,
            closeButton: true,
            onClick: function(e) { if (e && e.component) e.component.hide(); }
        });
        if (instance && instance.element) {
            try {
                $(instance.element()).off('click.toastClose').on('click.toastClose', function() { instance.hide(); });
            } catch (ignore) { }
        }
    }
}

function showDbStatusPanel(data) {
    if (!data || !Array.isArray(data.statuses)) return;

    var all = data.statuses;
    var total = all.length;
    var failed = all.filter(function(s) { return !s.ok; });

    if (failed.length === 0) {
        console.log('[DbHealth] Все БД доступны (' + total + ')');
        toast('Стартовая диагностика: все БД доступны ...', 'success', 2500);
    } else {
        console.warn('[DbHealth] Недоступны БД:', failed.map(function(s) { return s.name; }));
        var names = failed.slice(0, 3).map(function(s) {
            return s.name + (s.error ? ' — ' + shortError(s.error) : '');
        }).join('; ');
        if (failed.length > 3) names += '; и ещё ' + (failed.length - 3);
        toast('Не подключены БД: ' + names, 'error', 60000);
    }
}

// Фасад: один вызов для инициализации
async function runDbHealth(apiBase) {
    try {
        var data = await checkDbHealth(apiBase);
        showDbStatusPanel(data);
    } catch (e) {
        console.warn('[DbHealth] Сервер статуса БД недоступен:', e && e.message);
        var why = (e && e.name === 'AbortError') ? ' — таймаут' : '';
        toast('Стартовая диагностика: сервер статуса БД недоступен (' + (apiBase || '') + why + ')', 'warning', 10000);
    }
}

export { checkDbHealth, showDbStatusPanel, runDbHealth };