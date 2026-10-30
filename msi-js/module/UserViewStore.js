// UserViewStore.js
// Персональное хранилище состояния отображения отчётов (серверный файл <login>_views.json).
// Формат файла:
// {
//   "version": 1, "login": "user", "updatedAt": "ISO",
//   "reports": {
//     "<reportKey>": {
//       "current": { "mode": "...", "filters": {}, "pivot": {}, "dashboard": {}, "updatedAt": "ISO" },
//       "variants": [ { "name": "...", "createdAt": "ISO", "updatedAt": "ISO", "state": {...} } ],
//       "activeVariant": "..." | null
//     }
//   }
// }

export function reportKeyOf(report) {
  if (!report) return null;
  var v = report.id || report.key;
  if (v === undefined || v === null || v === '') return null;
  return String(v);
}

function _sanitizeLogin(login) {
  var s = String(login || 'user');
  s = s.replace(/[^A-Za-z0-9_.-]/g, '_');
  s = s.replace(/\.\.+/g, '_');
  if (!s || s === '.' || s === '..') s = 'user';
  return s;
}

function _deepCopy(obj) {
  if (obj === undefined || obj === null) return obj;
  try { return JSON.parse(JSON.stringify(obj)); } catch (e) { return obj; }
}

// Канонизация для сравнения "изменён": сортировка ключей + отбрасывание волатильных
// полей (timestamp в состоянии дашборда).
function _canonical(value) {
  if (Array.isArray(value)) return value.map(_canonical);
  if (value && typeof value === 'object') {
    var out = {};
    Object.keys(value).sort().forEach(function(k) {
      if (k === 'timestamp') return;
      out[k] = _canonical(value[k]);
    });
    return out;
  }
  return value;
}

function _stableStringify(value) {
  return JSON.stringify(_canonical(value));
}

export class UserViewStore {
  constructor(options) {
    options = options || {};
    this.login = _sanitizeLogin(options.login || 'user');
    this.dataDir = String(options.dataDir || '').replace(/[\\\/]+$/, '');
    this.saveFileUrl = options.saveFileUrl || '';
    this.loadFileUrl = options.loadFileUrl || '';
    this.cacheKey = 'user_views_cache_' + this.login;
    this.filePath = (this.dataDir ? this.dataDir + '/' : '') + this.login + '_views.json';

    this._data = this._emptyData();
    this._readyPromise = null;
    this._loaded = false;
    this._writing = false;
    this._pending = false;
    this._writeTimer = null;
    this._dirty = false;
    this._lastErrorAt = 0;
    this._persistDelay = 400;

    console.log('UserViewStore создан:', this.filePath);
  }

  _emptyData() {
    return {
      version: 2,
      login: this.login,
      updatedAt: new Date().toISOString(),
      reports: {}
    };
  }

  _normalize(parsed) {
    var data = this._emptyData();
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      if (parsed.reports && typeof parsed.reports === 'object' && !Array.isArray(parsed.reports)) {
        data.reports = parsed.reports;
      }
      if (parsed.updatedAt) data.updatedAt = parsed.updatedAt;
    }
    // Гарантируем корректную форму каждой записи отчёта (варианты — по режимам).
    Object.keys(data.reports).forEach(function(key) {
      var r = data.reports[key];
      if (!r || typeof r !== 'object') {
        data.reports[key] = { current: null, variants: {}, activeVariant: {} };
        return;
      }
      if (r.current === undefined) r.current = null;

      if (Array.isArray(r.variants)) {
        // Миграция со старого формата (плоский массив) в per-mode карту.
        var map = {};
        r.variants.forEach(function(v) {
          if (!v) return;
          var m = (v.state && v.state.mode) || 'pivot';
          if (!map[m]) map[m] = [];
          map[m].push({ name: v.name, createdAt: v.createdAt, updatedAt: v.updatedAt, state: v.state });
        });
        r.variants = map;
        var act = {};
        if (typeof r.activeVariant === 'string' && r.activeVariant) {
          Object.keys(map).some(function(m) {
            if (map[m].some(function(x) { return x.name === r.activeVariant; })) { act[m] = r.activeVariant; return true; }
            return false;
          });
        }
        r.activeVariant = act;
      }
      if (!r.variants || typeof r.variants !== 'object' || Array.isArray(r.variants)) r.variants = {};
      if (!r.activeVariant || typeof r.activeVariant !== 'object' || Array.isArray(r.activeVariant)) r.activeVariant = {};
    });
    data.login = this.login;
    return data;
  }

  // ─── Инициализация ───────────────────────────────────────────────────────

  ready() {
    if (this._readyPromise) return this._readyPromise;
    this._readyPromise = this._init();
    return this._readyPromise;
  }

  async _init() {
    var cache = this._loadCache();
    var res = await this._loadServerFile();
    if (res.ok) {
      this._data = res.data;
      this._loaded = true;
    } else {
      this._data = this._emptyData();
      this._loaded = false;
    }

    if (cache) {
      // Незавершённые локальные правки важнее серверных, но применяем кэш только если он
      // не старше серверного файла (иначе это откат к устаревшему состоянию).
      var cacheTime = Date.parse(cache.updatedAt || '') || 0;
      var serverTime = res.ok ? (Date.parse((res.data && res.data.updatedAt) || '') || 0) : 0;
      if (!res.ok || cacheTime > serverTime) {
        var merged = this._normalize(cache);
        if (res.ok) {
          // Сохраняем отчёты, которых нет в кэше, чтобы не потерять их на сервере.
          var self = this;
          Object.keys(this._data.reports).forEach(function(k) {
            if (!merged.reports[k]) merged.reports[k] = self._data.reports[k];
          });
        }
        this._data = merged;
        this._dirty = true;
        console.log('UserViewStore: применяю офлайн-кэш, синхронизирую с файлом');
      } else {
        this._clearCache();
      }
    }

    if (this._dirty && this._loaded) {
      try {
        await this._writeFile();
        this._dirty = false;
        this._clearCache();
      } catch (e) {
        console.warn('UserViewStore: синхронизация кэша не удалась, продолжаю офлайн:', e);
      }
    }
    return this;
  }

  // Загружает серверный файл. ok=true означает, что ответ достоверно разобран
  // (в т.ч. отсутствующий/пустой файл = новый пользователь); ok=false — сбой сети
  // или разбора, при котором запись на сервер должна быть отложена.
  async _loadServerFile() {
    try {
      var resp = await $.ajax({
        url: this.loadFileUrl + '?path=' + encodeURIComponent(this.filePath),
        method: 'GET',
        cache: false
      });
      if (resp && resp.content) {
        return { ok: true, data: this._normalize(JSON.parse(resp.content)) };
      }
      return { ok: true, data: this._emptyData() };
    } catch (e) {
      console.warn('UserViewStore: не удалось загрузить файл, работаю офлайн:', e);
      return { ok: false, data: null };
    }
  }

  // Перед первой записью пытается прочитать серверный документ и объединить его с локальным
  // состоянием (локальные отчёты имеют приоритет). API отдаёт ошибку и для отсутствующего
  // файла, поэтому сбой чтения не блокирует запись — иначе новый пользователь вообще не
  // сможет создать файл; данные при этом остаются продублированы в офлайн-кэше.
  async _ensureLoadedBeforeWrite() {
    if (this._loaded) return true;
    var res = await this._loadServerFile();
    if (!res.ok) {
      // Короткий повтор — сглаживает разовые сбои сети/сервера.
      await new Promise(function(r) { setTimeout(r, 600); });
      res = await this._loadServerFile();
    }
    if (res.ok) {
      var local = this._data;
      var merged = res.data;
      if (local && local.reports) {
        Object.keys(local.reports).forEach(function(k) {
          merged.reports[k] = local.reports[k];
        });
      }
      this._data = merged;
      this._loaded = true;
      return true;
    }
    console.warn('UserViewStore: серверный файл не читается, записываю локальное состояние');
    return true;
  }

  // ─── Внутренние помощники ────────────────────────────────────────────────

  _ensureReport(reportKey) {
    if (!reportKey) return null;
    if (!this._data.reports[reportKey]) {
      this._data.reports[reportKey] = { current: null, variants: {}, activeVariant: {} };
    }
    var r = this._data.reports[reportKey];
    if (r.current === undefined) r.current = null;
    if (!r.variants || typeof r.variants !== 'object' || Array.isArray(r.variants)) r.variants = {};
    if (!r.activeVariant || typeof r.activeVariant !== 'object' || Array.isArray(r.activeVariant)) r.activeVariant = {};
    return r;
  }

  _currentOf(reportKey) {
    var r = this._data.reports[reportKey];
    return r && r.current ? r.current : null;
  }

  _variantsOf(reportKey, mode) {
    var r = this._data.reports[reportKey];
    if (!r || !r.variants || !mode) return null;
    return r.variants[mode] || null;
  }

  _ensureVariants(reportKey, mode) {
    if (!reportKey || !mode) return null;
    var r = this._ensureReport(reportKey);
    if (!r) return null;
    if (!r.variants[mode]) r.variants[mode] = [];
    return r.variants[mode];
  }

  _findVariant(reportKey, mode, name) {
    var list = this._variantsOf(reportKey, mode);
    if (!list) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === name) return list[i];
    }
    return null;
  }

  // Сравнимое представление состояния для конкретного режима (не зависит от других режимов).
  _relevantState(current, mode) {
    var out = { filters: (current && current.filters) || {} };
    if (mode === 'pivot') out.pivot = (current && current.pivot) || {};
    else if (mode === 'dashboard') out.dashboard = (current && current.dashboard) || {};
    return out;
  }

  _touch() {
    this._data.updatedAt = new Date().toISOString();
  }

  _loadCache() {
    try {
      var raw = localStorage.getItem(this.cacheKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('UserViewStore: ошибка чтения офлайн-кэша:', e);
      return null;
    }
  }

  _saveCache() {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(this._data));
    } catch (e) {
      console.error('UserViewStore: ошибка записи офлайн-кэша:', e);
    }
  }

  _clearCache() {
    try { localStorage.removeItem(this.cacheKey); } catch (e) {}
  }

  _notifyError(err) {
    var now = Date.now();
    if (now - this._lastErrorAt < 3000) return;
    this._lastErrorAt = now;
    try {
      var msg = err && err.statusText ? err.statusText : 'сеть недоступна';
      DevExpress.ui.notify('Не удалось сохранить состояние отчёта (' + msg + '), сохранено локально', 'warning', 3000);
    } catch (e) {}
    console.warn('UserViewStore: запись не удалась, данные сохранены в офлайн-кэш', err);
  }

  _writeFile() {
    this._data.updatedAt = new Date().toISOString();
    var content = JSON.stringify(this._data);
    console.log('UserViewStore: запись', this.filePath, '(' + content.length + ' байт)');
    return $.ajax({
      url: this.saveFileUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ path: this.filePath, content: content })
    });
  }

  // Сериализованная очередь записи: last-write-wins, без параллельных POST.
  // Небольшая задержка объединяет всплески изменений (перетаскивание диапазона и т.п.).
  _persist() {
    var self = this;
    self._pending = true;
    if (self._writeTimer) clearTimeout(self._writeTimer);
    self._writeTimer = setTimeout(function() {
      self._writeTimer = null;
      self._drain();
    }, this._persistDelay);
  }

  _drain() {
    var self = this;
    if (self._writing) return;
    self._writing = true;
    (async function drain() {
      while (self._pending) {
        self._pending = false;
        try {
          await self._ensureLoadedBeforeWrite();
          await self._writeFile();
          self._dirty = false;
          self._clearCache();
        } catch (e) {
          self._dirty = true;
          self._saveCache();
          self._notifyError(e);
          break;
        }
      }
      self._writing = false;
    })();
  }

  // Сброс несохранённого состояния при pagehide/выходе.
  flush() {
    try {
      if (this._writeTimer) { clearTimeout(this._writeTimer); this._writeTimer = null; }
      // Имеет смысл только при наличии несинхронизированных правок — иначе
      // не перезаписываем файл на сервере без необходимости.
      if (!(this._dirty || this._pending || this._writing)) return;
      this._saveCache();
      // Без достоверно прочитанного серверного файла маяк не отправляем,
      // чтобы не перезаписать чужие данные пустым документом.
      if (!this._loaded || !this._data) return;
      this._data.updatedAt = new Date().toISOString();
      var content = JSON.stringify(this._data);
      var payload = JSON.stringify({ path: this.filePath, content: content });
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        navigator.sendBeacon(this.saveFileUrl, new Blob([payload], { type: 'application/json' }));
      }
    } catch (e) {
      console.warn('UserViewStore.flush error:', e);
    }
  }

  // ─── Текущее состояние отчёта ────────────────────────────────────────────

  getCurrent(reportKey) {
    return _deepCopy(this._currentOf(reportKey));
  }

  setCurrent(reportKey, partial) {
    var r = this._ensureReport(reportKey);
    if (!r) return;
    var cur = r.current || { mode: null, filters: {}, pivot: {}, dashboard: {} };
    Object.keys(partial || {}).forEach(function(k) {
      cur[k] = _deepCopy(partial[k]);
    });
    cur.updatedAt = new Date().toISOString();
    r.current = cur;
    this._touch();
    this._persist();
  }

  getMode(reportKey) {
    var cur = this._currentOf(reportKey);
    return cur && cur.mode ? cur.mode : null;
  }

  setMode(reportKey, mode) {
    this.setCurrent(reportKey, { mode: mode || null });
  }

  getFilters(reportKey) {
    var cur = this._currentOf(reportKey);
    return cur && cur.filters ? _deepCopy(cur.filters) : null;
  }

  setFilters(reportKey, filters) {
    this.setCurrent(reportKey, { filters: filters || {} });
  }

  getPivot(reportKey) {
    var cur = this._currentOf(reportKey);
    return cur && cur.pivot ? _deepCopy(cur.pivot) : null;
  }

  setPivot(reportKey, state) {
    this.setCurrent(reportKey, { pivot: state || {} });
  }

  // Единая конфигурация stateStoring для dxPivotGrid (свод и дашборд делят одну раскладку).
  // DevExtreme использует для custom-типа именно customLoad/customSave.
  pivotStateStoring(reportKey) {
    var self = this;
    return {
      enabled: true,
      type: 'custom',
      savingTimeout: 1000,
      customSave: function(state) {
        if (reportKey) self.setPivot(reportKey, state);
        return $.Deferred().resolve().promise();
      },
      customLoad: function() {
        var state = reportKey ? self.getPivot(reportKey) : null;
        return $.Deferred().resolve(state || undefined).promise();
      }
    };
  }

  getDashboard(reportKey) {
    var cur = this._currentOf(reportKey);
    return cur && cur.dashboard ? _deepCopy(cur.dashboard) : null;
  }

  setDashboard(reportKey, state) {
    this.setCurrent(reportKey, { dashboard: state || {} });
  }

  clearCurrent(reportKey) {
    var r = this._ensureReport(reportKey);
    if (!r) return;
    r.current = null;
    r.activeVariant = {};
    this._touch();
    this._persist();
  }

  // ─── Именованные варианты (отдельный список для каждого режима) ───────────

  listVariants(reportKey, mode) {
    var list = this._variantsOf(reportKey, mode);
    if (!list) return [];
    return list.map(function(v) {
      return { name: v.name, createdAt: v.createdAt, updatedAt: v.updatedAt };
    });
  }

  hasVariant(reportKey, mode, name) {
    return !!this._findVariant(reportKey, mode, name);
  }

  saveVariant(reportKey, mode, name, state) {
    name = String(name || '').trim();
    if (!name || !mode) return false;
    var list = this._ensureVariants(reportKey, mode);
    if (!list) return false;
    var now = new Date().toISOString();
    var existing = this._findVariant(reportKey, mode, name);
    if (existing) {
      existing.state = _deepCopy(state);
      existing.updatedAt = now;
    } else {
      list.push({ name: name, createdAt: now, updatedAt: now, state: _deepCopy(state) });
    }
    this._touch();
    this._persist();
    return !!existing;
  }

  renameVariant(reportKey, mode, oldName, newName) {
    newName = String(newName || '').trim();
    if (!oldName || !newName || !mode) return false;
    if (oldName === newName) return true;
    if (this._findVariant(reportKey, mode, newName)) return false;
    var v = this._findVariant(reportKey, mode, oldName);
    if (!v) return false;
    v.name = newName;
    v.updatedAt = new Date().toISOString();
    var r = this._ensureReport(reportKey);
    if (r && r.activeVariant && r.activeVariant[mode] === oldName) r.activeVariant[mode] = newName;
    this._touch();
    this._persist();
    return true;
  }

  deleteVariant(reportKey, mode, name) {
    var list = this._variantsOf(reportKey, mode);
    if (!list) return false;
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === name) { idx = i; break; }
    }
    if (idx < 0) return false;
    list.splice(idx, 1);
    var r = this._ensureReport(reportKey);
    if (r && r.activeVariant && r.activeVariant[mode] === name) r.activeVariant[mode] = null;
    this._touch();
    this._persist();
    return true;
  }

  getVariantState(reportKey, mode, name) {
    var v = this._findVariant(reportKey, mode, name);
    return v ? _deepCopy(v.state) : null;
  }

  getActiveVariant(reportKey, mode) {
    var r = this._data.reports[reportKey];
    if (!r || !r.activeVariant || !mode) return null;
    return r.activeVariant[mode] || null;
  }

  setActiveVariant(reportKey, mode, name) {
    var r = this._ensureReport(reportKey);
    if (!r || !mode) return;
    r.activeVariant[mode] = name || null;
    this._touch();
    this._persist();
  }

  // Копирует состояние варианта в current и помечает его активным в своём режиме.
  applyVariant(reportKey, mode, name) {
    var state = this.getVariantState(reportKey, mode, name);
    if (!state) return false;
    var r = this._ensureReport(reportKey);
    if (!r) return false;
    var cur = _deepCopy(state);
    cur.mode = mode;
    cur.updatedAt = new Date().toISOString();
    r.current = cur;
    r.activeVariant[mode] = name;
    this._touch();
    this._persist();
    return true;
  }

  isModified(reportKey, mode) {
    var active = this.getActiveVariant(reportKey, mode);
    if (!active) return false;
    var v = this._findVariant(reportKey, mode, active);
    if (!v) return false;
    var cur = this._currentOf(reportKey);
    return _stableStringify(this._relevantState(cur, mode)) !== _stableStringify(this._relevantState(v.state, mode));
  }
}

let _instance = null;

export function initUserViewStore(options) {
  _instance = new UserViewStore(options);
  return _instance;
}

export function getUserViewStore() {
  return _instance;
}
