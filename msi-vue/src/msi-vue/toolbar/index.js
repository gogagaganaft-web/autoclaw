import {
  defineComponent, onMounted, onBeforeUnmount, ref, h, provide, inject, render, watch,
} from 'vue';
import { applyWidgetAppContext } from '../create-widget.js';

const TOOLBAR_ITEMS_KEY = Symbol('msi-toolbar-items');

function pickDefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = v;
  }
  return out;
}

function makeTemplate(slotFn) {
  return (item) => {
    const v = slotFn();
    const arr = Array.isArray(v) ? v : [v];
    const filtered = arr.filter((node) => node != null);
    if (!filtered.length) return null;

    // appContext обязателен: без него inject (router) в компонентах шаблона
    // не работает — см. create-widget.js setWidgetAppContext.
    applyWidgetAppContext(filtered);
    const container = document.createElement('div');
    render(filtered.length === 1 ? filtered[0] : filtered, container);
    return container.firstElementChild || container;
  };
}

export const DxToolbar = defineComponent({
  name: 'DxToolbar',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: undefined },
    multiline: { type: Boolean, default: undefined },
    height: { type: [Number, String], default: undefined },
  },
  setup(props, { attrs, slots, expose }) {
    const el = ref(null);
    const registeredItems = ref([]);
    let widget = null;

    provide(TOOLBAR_ITEMS_KEY, {
      register(item) {
        if (item) registeredItems.value.push(item);
      },
      unregister(item) {
        const i = registeredItems.value.indexOf(item);
        if (i >= 0) registeredItems.value.splice(i, 1);
      },
    });

    const collectOptions = () => {
      const options = pickDefined(attrs);
      if (props.multiline !== undefined) options.multiline = props.multiline;
      if (props.height !== undefined) options.height = props.height;
      if (props.items) options.items = props.items;
      else if (registeredItems.value.length) options.items = registeredItems.value;
      return options;
    };

    onMounted(() => {
      const Ctor = window.MSI?.ui?.dxToolbar;
      if (!Ctor) {
        console.warn('[msi-vue] MSI.ui.dxToolbar not found');
        return;
      }
      Promise.resolve().then(() => {
        const items = registeredItems.value.filter(Boolean);
        widget = new Ctor(el.value, { ...collectOptions(), items });
        if (items.length && widget?.option) {
          try { if (widget.option('items') !== items) widget.option('items', items); } catch (e) {}
        }
        expose({ instance: () => widget });
      });
    });

    onBeforeUnmount(() => {
      try { widget?.dispose?.(); } catch (e) {}
      widget = null;
    });

    return () => h('div', { ref: el }, slots.default ? slots.default() : undefined);
  },
});

export const DxItem = defineComponent({
  name: 'DxItem',
  props: {
    location: String,
    widget: String,
    options: Object,
    cssClass: String,
    visible: { type: Boolean, default: true },
    locateInMenu: String,
    menuItemTemplate: String,
  },
  setup(props, { slots }) {
    const itemsApi = inject(TOOLBAR_ITEMS_KEY, null);
    const itemConfig = ref(null);

    const buildConfig = () => {
      const cfg = pickDefined({
        location: props.location,
        widget: props.widget,
        options: props.options,
        cssClass: props.cssClass,
        visible: props.visible,
        locateInMenu: props.locateInMenu,
        menuItemTemplate: props.menuItemTemplate,
      });
      if (slots.default) {
        cfg.template = makeTemplate(slots.default);
      }
      return cfg;
    };

    itemConfig.value = buildConfig();

    onMounted(() => {
      if (itemsApi && itemConfig.value) itemsApi.register(itemConfig.value);
    });

    onBeforeUnmount(() => {
      if (itemsApi && itemConfig.value) itemsApi.unregister(itemConfig.value);
    });

    watch(
      () => ({ ...props }),
      () => { itemConfig.value = buildConfig(); },
      { deep: true }
    );

    return () => null;
  },
});

export default DxToolbar;