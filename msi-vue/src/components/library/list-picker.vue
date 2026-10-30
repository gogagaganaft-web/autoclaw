<template>
  <div
    ref="rootEl"
    class="list-picker"
  >
    <div
      class="list-picker__box"
      :class="{ 'list-picker__box--open': open }"
      @click="toggle()"
    >
      <span
        v-if="!displayText"
        class="list-picker__placeholder"
      >{{ placeholder || 'Выберите значения' }}</span>
      <span
        v-else
        class="list-picker__text"
      >{{ displayText }}</span>
      <span class="list-picker__tools">
        <span
          v-if="selectedKeys.length && showClearButton"
          class="list-picker__clear"
          title="Очистить"
          @click.stop="clear()"
        >&times;</span>
        <span class="list-picker__arrow">&#9662;</span>
      </span>
    </div>

    <div
      v-show="open"
      class="list-picker__panel"
    >
      <div
        ref="listEl"
        class="list-picker__list"
      />
      <div class="list-picker__footer">
        <span
          v-if="multiple"
          class="list-picker__count"
        >Выбрано: {{ stagedItems.length }}</span>
        <dx-button
          v-if="multiple"
          :text="allSelected ? 'Снять всё' : 'Все'"
          styling-mode="text"
          @click="toggleAll()"
        />
        <dx-button
          text="Сбросить"
          icon="clearcircle"
          styling-mode="text"
          @click="clear()"
        />
        <dx-button
          text="ОК"
          type="default"
          styling-mode="contained"
          @click="close()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { DxButton } from 'devextreme-vue/button';

// Список с поиском и чекбоксами в выпадающей панели — перенос
// createMultiSelectListItem из боевого FormItemBuilder: dxList с searchEnabled
// (строка поиска над списком), «выбрать всё», догрузкой и кнопками внизу.
// Используется и панелью «Контур данных», и примером фильтра — вид одинаковый.

const props = withDefaults(defineProps<{
  value: unknown[],
  items: Array<{ id: unknown; name: string }>,
  placeholder?: string,
  /** Строка поиска над списком (searchEnabled у dxList). */
  search?: boolean,
  searchMode?: string,
  searchExpr?: string[],
  searchTimeout?: number,
  searchPlaceholder?: string,
  selectAllMode?: string,
  pageLoadMode?: string,
  showScrollbar?: string,
  showSelectionControls?: boolean,
  showClearButton?: boolean,
  /** Множественный выбор с чекбоксами; false — одиночный (без чекбоксов). */
  multiple?: boolean,
  /** Высота списка в панели. */
  height?: number,
}>(), {
  placeholder: '',
  search: true,
  multiple: true,
  searchMode: 'contains',
  searchExpr: () => ['name'],
  searchTimeout: 500,
  searchPlaceholder: 'Поиск...',
  selectAllMode: 'allPages',
  pageLoadMode: 'scrollBottom',
  showScrollbar: 'onHover',
  showSelectionControls: true,
  showClearButton: true,
  height: 300,
});

const emit = defineEmits<{
  'update:value': [unknown[]],
}>();

const rootEl = ref<HTMLElement | null>(null);
/** Черновой выбор: имена — для счётчика, «ОК» и подсказки бокса. */
const stagedItems = ref<Array<{ id: unknown; name: string }>>([]);
const listEl = ref<HTMLElement | null>(null);
const open = ref(false);

let list: any = null;
let syncing = false;

const selectedKeys = computed<unknown[]>(() => (Array.isArray(props.value) ? props.value : []));

const displayText = computed(() => {
  const keys = selectedKeys.value;
  if (!keys.length) return '';
  const names = keys.map((key) => {
    const found = props.items.find((item) => String(item.id) === String(key));
    return found ? found.name : String(key);
  }).filter(Boolean);
  if (!names.length) return `${keys.length} знач.`;
  if (names.length <= 3) return names.join(', ');
  return `${names.length} знач.: ${names.slice(0, 2).join(', ')}, …`;
});

function ensureList() {
  if (list || !listEl.value) return;
  const Ctor = (window as any).MSI?.ui?.dxList;
  if (!Ctor) return;
  list = new Ctor(listEl.value, {
    dataSource: props.items,
    keyExpr: 'id',
    displayExpr: 'name',
    // 'multiple' + свои чекбоксы: в режиме 'all' клик по чекбоксу строки
    // выделяет всё — причуда сборки MSI. «Выбрать всё» — кнопкой в футере.
    selectionMode: props.multiple ? 'multiple' : 'single',
    showSelectionControls: props.showSelectionControls && props.multiple,
    selectAllMode: props.selectAllMode,
    selectedItemKeys: selectedKeys.value,
    searchEnabled: props.search,
    searchExpr: props.searchExpr,
    searchMode: props.searchMode,
    searchTimeout: props.searchTimeout,
    searchPlaceholder: props.searchPlaceholder,
    pageLoadMode: props.pageLoadMode,
    showScrollbar: props.showScrollbar,
    height: props.height,
    onSelectionChanged: (e: any) => {
      if (syncing) return;
      const selected = e.component.option('selectedItemKeys') || [];
      // Черновик: имена по справочнику — для счётчика и «ОК».
      const picked = props.items.filter((i) => selected.includes(i.id as never));
      stagedItems.value = picked.map((i) => ({ id: i.id, name: i.name }));
      // Одиночный выбор — скаляр (или null), множественный — массив.
      emit('update:value', props.multiple ? [...selected] : (selected[0] ?? null));
    },
  });

  // Сборка MSI игнорирует опции поиска в конструкторе dxList (как и у
  // dxTreeList): применяем пост-созданием, поиск включаем последним —
  // он запускает отрисовку строки над списком.
  if (props.search) {
    setTimeout(() => {
      if (!list) return;
      try {
        list.option('searchExpr', props.searchExpr);
        list.option('searchMode', props.searchMode);
        list.option('searchTimeout', props.searchTimeout);
        list.option('searchPlaceholder', props.searchPlaceholder);
        list.option('searchEditorOptions', { placeholder: props.searchPlaceholder });
        list.option('searchEnabled', true);
      } catch { /* поиск не критичен */ }
    }, 0);
  }
}

// Смена справочника (правка SQL/типа в редакторе фильтров) — перечитываем список.
watch(() => props.items, () => {
  if (!list) return;
  list.option('dataSource', props.items);
});

// Внешнее изменение значения (сброс панели, восстановление состояния).
watch(() => props.value, (keys) => {
  if (!list) return;
  syncing = true;
  try {
    list.option('selectedItemKeys', Array.isArray(keys) ? keys : []);
  } catch { /* список ещё не создан */ }
  syncing = false;
});

/** Всё ли выбрано (по id из справочника). */
const allSelected = computed(() => {
  if (!props.multiple) return false;
  const ids = props.items.map((i) => i.id);
  return ids.length > 0 && ids.every((id) => selectedKeys.value.includes(id as never));
});

/** Выбрать/снять всё: надёжнее через selectedItemKeys, чем через selectAll. */
function toggleAll() {
  if (!props.multiple || !list) return;
  const next = allSelected.value
    ? []
    : props.items.map((i) => i.id);
  syncing = true;
  try {
    list.option('selectedItemKeys', next);
  } catch { /* список ещё не создан */ }
  syncing = false;
  stagedItems.value = allSelected.value
    ? []
    : props.items.map((i) => ({ id: i.id, name: i.name }));
  emit('update:value', props.multiple ? [...next] : null);
  emit('update:names', stagedItems.value.map((i) => i.name).join(', '));
}

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function clear() {
  syncing = true;
  try {
    list?.unselectAll?.();
    list?.option('selectedItemKeys', []);
  } catch { /* список ещё не создан */ }
  syncing = false;
  emit('update:value', props.multiple ? [] : null);
}

watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  ensureList();
  syncing = true;
  try {
    list?.option('selectedItemKeys', selectedKeys.value);
  } catch { /* ignore */ }
  syncing = false;
});

function onDocumentClick(event: MouseEvent) {
  if (!open.value) return;
  const root = rootEl.value;
  if (root && !root.contains(event.target as Node)) open.value = false;
}

document.addEventListener('mousedown', onDocumentClick);

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentClick);
  try {
    list?.dispose?.();
  } catch { /* ignore */ }
  list = null;
});
</script>

<style scoped lang="scss">
.list-picker {
  position: relative;

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 34px;
    padding: 4px 8px 4px 12px;
    border: 1px solid rgba(128, 128, 128, 0.45);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;

    &--open {
      border-color: var(--dx-color-primary, #337ab7);
    }
  }

  &__placeholder {
    opacity: 0.55;
  }

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__tools {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: none;
  }

  &__clear {
    opacity: 0.6;
    font-size: 16px;
    line-height: 1;

    &:hover {
      opacity: 1;
    }
  }

  &__arrow {
    opacity: 0.7;
  }

  &__panel {
    position: absolute;
    z-index: 1200;
    top: calc(100% + 4px);
    left: 0;
    width: max(420px, 100%);
    background: var(--dx-color-main-bg, #fff);
    border: 1px solid rgba(128, 128, 128, 0.35);
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    padding: 6px;
  }

  &__list {
    max-height: 340px;
    overflow: auto;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 4px 0;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
  }

  &__count {
    margin-right: auto;
    font-size: 12px;
    opacity: 0.75;
  }
}
</style>
