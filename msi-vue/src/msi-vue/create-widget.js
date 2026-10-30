import {
  defineComponent, onMounted, onBeforeUnmount, ref, h, watch, render,
  provide, inject,
} from 'vue';

// DevExtreme ждёт имена опций в camelCase (columnAutoWidth, rowAlternationEnabled,
// onContentReady, ...). Во Vue-шаблонах их пишут через дефис, и такие атрибуты
// попадают в attrs как есть — DevExtreme их молча игнорирует, из-за чего,
// например, у таблицы отключён columnAutoWidth и колонки сжимаются до 53 px.
function toCamelCase(key) {
  return key.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());
}

function normalizeOptionKeys(obj) {
  const out = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v === undefined || v === null) continue;
    const key = k.indexOf('-') === -1 ? k : toCamelCase(k);
    if (out[key] === undefined) out[key] = v;
  }
  return out;
}

// Шаблоны MSI (itemTemplate/contentTemplate) рендерятся вне дерева
// приложения — Vue render() без appContext не видит provide/inject,
// и компоненты шаблонов (header-user и др.) падают с
// «injection "Symbol(router)" not found». main.ts передаёт контекст сюда.
let widgetAppContext = null;

export function setWidgetAppContext(context) {
  widgetAppContext = context;
}

/** Кладёт appContext на vnode шаблона: без него inject (router и др.)
 * внутри компонентов MSI-шаблонов не работает. */
export function applyWidgetAppContext(nodes) {
  if (!widgetAppContext) return;
  for (const node of nodes) {
    if (node && typeof node === 'object') {
      node.appContext = widgetAppContext;
    }
  }
}

function renderVNodes(slotFn, container) {
  const target = container instanceof Element
    ? container
    : (container && container[0] instanceof Element ? container[0] : null);
  if (!target) return;
  const v = slotFn();
  const arr = Array.isArray(v) ? v : [v];
  const filtered = arr.filter((node) => node != null);
  if (filtered.length) {
    applyWidgetAppContext(filtered);
    render(filtered.length === 1 ? filtered[0] : filtered, target);
  }
}

// DevExtreme-шаблоны вызываются по-разному: contentTemplate(contentElement),
// itemTemplate(itemData, itemIndex, itemElement), cellTemplate(cellInfo,
// cellElement) и т. п. Контейнер для рендера — первый аргумент, являющийся
// DOM-элементом; остальные аргументы уходят в слот как его scope-данные.
// В шаблонах тега TagBox DevExtreme отдаёт объект рендера
// `{ model, container, onRendered }` — контейнер лежит в нём.
function templateContainer(args) {
  for (const arg of args) {
    if (arg instanceof Element) return arg;
    if (arg && arg[0] instanceof Element) return arg[0];
    if (arg && arg.container instanceof Element) return arg.container;
    if (arg && arg.element instanceof Element) return arg.element;
  }
  return null;
}

// Scope-объект слота. DevExtreme передаёт данные шаблона двумя способами:
// позиционно (`itemTemplate(itemData, itemIndex, itemElement)`) и объектом
// рендера (`{ model, container, onRendered }` — так вызывается, например,
// шаблон тега TagBox). Во Vue-шаблонах принят вид `#item="{ data }"`, поэтому
// объект данных отдаётся и как сам scope (scope.title), и через свойство
// `data` (scope.data.title). Если у данных уже есть своё поле `data`
// (cellInfo грида), оно не затирается.
function templateScopes(args) {
  const element = templateContainer(args);
  const first = args[0];
  const scope = {};
  if (first && typeof first === 'object') {
    if ('model' in first) {
      // Объект рендера DevExtreme: данные — в model.
      scope.model = first.model;
      scope.data = first.model;
    } else {
      Object.assign(scope, first);
      scope.data = ('data' in first) ? first.data : first;
    }
  } else {
    scope.data = first;
  }
  if (args.length > 1) scope.index = args[1];
  scope.element = element;
  return [scope];
}

// ---------------------------------------------------------------------------
// Config components (DxSeries, DxScale, DxLayer, ...)
//
// DevExtreme Vue wrappers merge nested option components into the parent
// widget options. Simple render-null stubs silently dropped that nested
// configuration (series argument fields, scale settings, map layers, ...),
// which caused widget warnings like W2002/E2203 and empty charts.
//
// `configComponent` registers its own attributes into the nearest widget
// under the option path derived from the component name
// (DxScale -> scale, DxCommonSeriesSettings -> commonSeriesSettings, ...).
// Nested config components extend the path (DxLabel inside DxValueAxis ->
// valueAxis.label). Collection options (series, layers) are gathered into
// arrays; repeated non-collection keys are merged in registration order
// (the last one wins on conflicts).
// ---------------------------------------------------------------------------

export const CONFIG_CONTEXT_KEY = Symbol('msi-widget-config');

// Option keys that hold arrays of collection items.
const COLLECTION_OPTION_KEYS = new Set(['series']);

let configComponentId = 0;

function joinPath(basePath, key) {
  return basePath ? `${basePath}.${key}` : key;
}

function createConfigStore() {
  const entries = new Map();
  let seqCounter = 0;
  const subscribers = new Set();
  return {
    entries,
    nextSeq() {
      seqCounter += 1;
      return seqCounter;
    },
    subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    notify(topKey) {
      subscribers.forEach((fn) => fn(topKey));
    },
  };
}

// Builds the option object for a top-level key from registered entries.
function buildConfigOption(store, topKey) {
  const list = [...store.entries.values()]
    .filter((entry) => entry.path === topKey || entry.path.startsWith(`${topKey}.`))
    .sort((a, b) => a.seq - b.seq);
  if (!list.length) return undefined;

  const root = {};
  for (const entry of list) {
    const segments = entry.path.split('.');
    let node = root;
    for (let i = 0; i < segments.length - 1; i += 1) {
      const segment = segments[i];
      if (Array.isArray(node[segment])) {
        if (!node[segment].length) node[segment].push({});
        node = node[segment][node[segment].length - 1];
      } else {
        if (node[segment] === undefined || node[segment] === null) node[segment] = {};
        node = node[segment];
      }
    }
    const leaf = segments[segments.length - 1];
    if (entry.collection) {
      if (!Array.isArray(node[leaf])) {
        node[leaf] = node[leaf] === undefined || node[leaf] === null ? [] : [node[leaf]];
      }
      node[leaf].push({ ...entry.options });
    } else {
      if (node[leaf] === null || typeof node[leaf] !== 'object' || Array.isArray(node[leaf])) {
        node[leaf] = {};
      }
      Object.assign(node[leaf], entry.options);
    }
  }
  return root;
}

export function configComponent(name, componentOptions = {}) {
  const rawKey = componentOptions.key || name.replace(/^dx/, '');
  const optionKey = rawKey.charAt(0).toLowerCase() + rawKey.slice(1);
  const collection = componentOptions.collection !== undefined
    ? componentOptions.collection
    : COLLECTION_OPTION_KEYS.has(optionKey);

  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      const ctx = inject(CONFIG_CONTEXT_KEY, null);
      const id = ++configComponentId;

      if (ctx) {
        const path = joinPath(ctx.basePath, optionKey);
        const topKey = path.split('.')[0];
        const seq = ctx.store.nextSeq();
        const commit = () => {
          ctx.store.entries.set(id, {
            id, path, seq, options: normalizeOptionKeys({ ...attrs }), collection,
          });
          ctx.store.notify(topKey);
        };
        commit();
        watch(() => ({ ...attrs }), commit, { deep: true });
        onBeforeUnmount(() => {
          ctx.store.entries.delete(id);
          ctx.store.notify(topKey);
        });
        provide(CONFIG_CONTEXT_KEY, { basePath: path, store: ctx.store });
      }

      // Slot content instantiates nested config components.
      return () => (slots.default ? slots.default() : null);
    },
  });
}

export function createWidget(widgetName, propNames) {
  propNames = propNames || [];
  return defineComponent({
    name: widgetName.replace(/^dx/, 'Dx'),
    inheritAttrs: false,
    props: propNames.length
      ? Object.fromEntries(propNames.map((p) => [p, null]))
      : {},
    setup(props, { attrs, expose, slots }) {
      const el = ref(null);
      let widget = null;

      // Nested config components (DxSeries, DxScale, ...) register their
      // attributes into the widget options through this context.
      const configStore = createConfigStore();
      provide(CONFIG_CONTEXT_KEY, { basePath: '', store: configStore });

      let applyConfigQueued = false;
      const pendingConfigKeys = new Set();
      const unsubscribeConfig = configStore.subscribe((topKey) => {
        pendingConfigKeys.add(topKey);
        if (applyConfigQueued) return;
        applyConfigQueued = true;
        queueMicrotask(() => {
          applyConfigQueued = false;
          const keys = [...pendingConfigKeys];
          pendingConfigKeys.clear();
          if (!widget) return;
          for (const key of keys) {
            const value = buildConfigOption(configStore, key);
            if (value === undefined) continue;
            try {
              if (widget.option(key) !== value) widget.option(key, value);
            } catch (e) {}
          }
        });
      });

      // expose must run synchronously in setup so template refs get `instance`.
      // A getter keeps it live: it returns null before mount, widget after.
      expose({
        get instance() { return widget; },
      });

      const collectOptions = () => {
        const options = normalizeOptionKeys(attrs);
        for (const key of propNames) {
          if (props[key] !== undefined && props[key] !== null) {
            options[key] = props[key];
          }
        }
        for (const name of Object.keys(slots)) {
          const slot = slots[name];
          const template = (...args) => renderVNodes(
            () => slot(...templateScopes(args)),
            templateContainer(args),
          );
          if (name === 'default') {
            options.template = template;
          } else {
            options[name + 'Template'] = template;
          }
        }
        // Merge option subtrees registered by nested config components.
        // An explicit prop/attr on the widget wins over config components.
        const configTopKeys = new Set(
          [...configStore.entries.values()].map((entry) => entry.path.split('.')[0]),
        );
        for (const key of configTopKeys) {
          if (options[key] !== undefined) continue;
          const value = buildConfigOption(configStore, key);
          if (value !== undefined) options[key] = value;
        }
        return options;
      };

      onMounted(() => {
        const Ctor = window.MSI?.ui?.[widgetName] || window.MSI?.viz?.[widgetName];
        if (!Ctor) {
          console.warn('[msi-vue] Widget MSI.*.' + widgetName + ' not found');
          return;
        }
        try {
          widget = new Ctor(el.value, collectOptions());
        } catch (e) {
          console.error('[msi-vue] Failed to create ' + widgetName, e);
        }
      });

      onBeforeUnmount(() => {
        unsubscribeConfig();
        configStore.entries.clear();
        try { widget?.dispose?.(); } catch (e) {}
        widget = null;
      });

      watch(
        () => ({ ...attrs, ...props }),
        () => {
          if (!widget) return;
          const next = collectOptions();
          for (const key of Object.keys(next)) {
            if (key.endsWith('Template') || key === 'template') continue;
            try {
              // Р—Р°С‰РёС‚Р° РѕС‚ СЂРµРєСѓСЂСЃРёРё: РѕР±РЅРѕРІР»СЏРµРј С‚РѕР»СЊРєРѕ РµСЃР»Рё Р·РЅР°С‡РµРЅРёРµ РёР·РјРµРЅРёР»РѕСЃСЊ
              const current = widget.option(key);
              if (current !== next[key]) {
                widget.option(key, next[key]);
              }
            } catch (e) {}
          }
        },
        { deep: true }
      );

      return () => h('div', { ref: el }, slots.default ? slots.default() : undefined);
    },
  });
}

export const stub = (name) => ({ name, render: () => null });