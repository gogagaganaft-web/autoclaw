import { defineComponent, h } from 'vue';

// DxSortable Р·Р°РјРµРЅРµРЅ РЅР° РѕР±С‹С‡РЅС‹Р№ div, С‚Р°Рє РєР°Рє MSI Sortable РєРѕРЅС„Р»РёРєС‚СѓРµС‚ СЃ Vue DOM
export const DxSortable = defineComponent({
  name: 'DxSortable',
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => h('div', { class: 'dx-sortable-stub' }, slots.default ? slots.default() : undefined);
  }
});

export const DxSortableTypes = {};

export default DxSortable;