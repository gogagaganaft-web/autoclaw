<template>
  <div
    ref="rootEl"
    class="fond-tree"
    :class="{ 'fond-tree--inline': inline }"
  >
    <div
      class="fond-tree__box"
      :class="{ 'fond-tree__box--open': open }"
      @click="toggle()"
    >
      <span
        v-if="!displayText"
        class="fond-tree__placeholder"
      >{{ placeholder || 'Выберите фонд' }}</span>
      <span
        v-else
        class="fond-tree__text"
        :title="displayTitle"
      >{{ displayText }}</span>
      <span class="fond-tree__tools">
        <span
          v-if="selectedIds.length"
          class="fond-tree__clear"
          title="Очистить"
          @click.stop="clear()"
        >&times;</span>
        <span class="fond-tree__arrow">&#9662;</span>
      </span>
    </div>

    <div
      v-show="open"
      class="fond-tree__panel"
      :style="panelStyle"
    >
      <div
        v-if="treeError"
        class="fond-tree__error"
      >
        {{ treeError }}
      </div>
      <!-- Дерево с filterRow и filterPanel; чекбоксы меняют черновой выбор,
           «ОК» финализирует его, клик мимо панели — отмена -->
      <div
        ref="treeEl"
        class="fond-tree__tree"
      />

      <div class="fond-tree__footer">
        <span class="fond-tree__count">Выбрано: {{ stagedItems.length }}</span>
        <dx-button
          text="ОК"
          type="default"
          styling-mode="contained"
          @click="okSelection()"
        />
      </div>

      <span
        class="fond-tree__resizer"
        title="Потяните, чтобы изменить размер"
        @mousedown.stop.prevent="startResize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { reportsApi } from '@/services/reports-api';
import {
  DEFAULT_FOND_ROOT, FOND_TREE_SQL, fondTreeSql, toNodeObjects,
  type FondItem, type FondNode,
} from '@/utils/fond-tree';

// Выпадающий список с деревом фондов (перенос MSI FondTreeList +
// dxDropDownBox). Значение — массив ID выбранных узлов (в SQL отчёта
// подставляется вместо {БД}).

const props = defineProps<{
  value: number[],
  dbName: string,
  rootValue?: number,
  sql?: string,
  placeholder?: string,
  /** preload: true — тянуть всё дерево одним запросом (тип hr-fond). */
  preload?: boolean,
  /** inline: дерево всегда развёрнуто и стоит в потоке (для предпросмотра). */
  inline?: boolean,
  /** Строка поиска дерева: filterRow + filterPanel + headerFilter. */
  search?: boolean,
  /** Подписи выбранных узлов из сохранённого состояния (ФОНД_displayText):
   *  показываются, пока имена не загружены из дерева. */
  savedText?: string,
}>();

const emit = defineEmits<{
  'update:value': [number[]],
  /** Строка имён выбранных узлов — панель сохраняет её как <поле>_displayText. */
  'update:names': [string],
}>();

const rootEl = ref<HTMLElement | null>(null);

// Шаблон без {finalIds} отдаёт сразу всё дерево: ленивый режим к таким данным
// неприменим (узлы не попадают под корень и список выглядит пустым).
const usePreload = computed(() => props.preload === true || !fondSqlTemplate().includes('{finalIds}'));
const treeEl = ref<HTMLElement | null>(null);
const open = ref(false);
const treeError = ref('');
const selectedItems = ref<FondItem[]>([]);
/** Черновой выбор внутри панели: наружу уходит только по «ОК». */
const stagedItems = ref<FondItem[]>([]);
/** Размеры панели после ресайза (null — CSS-умолчания). */
const panelW = ref<number | null>(null);
const panelH = ref<number | null>(null);
const allNodes = ref<FondNode[]>([]);
let preloaded = false;
let preloading: Promise<void> | null = null;

let tree: any = null;
let syncing = false;

const selectedIds = computed<number[]>(() => (Array.isArray(props.value) ? props.value : []));

const panelStyle = computed<Record<string, string>>(() => ({
  ...(panelW.value ? { width: `${panelW.value}px` } : {}),
  ...(panelH.value ? { height: `${panelH.value}px` } : {}),
}));

// В боксе — только счётчик: список имён не читается и разрастается.
// Сами ID видны в блоке «Значения, которые уйдут в SQL».
// В боксе — только строка имён выбранных узлов, без счётчиков.
// Пока имена не подтянулись из дерева, показываем подпись из сохранённого
// состояния, и только за её отсутствием — ID.
const displayText = computed(() => {
  const names = selectedItems.value.map((i) => i.name).filter(Boolean);
  if (names.length) {
    return names.length <= 3 ? names.join(', ') : `${names.slice(0, 2).join(', ')}, …`;
  }
  const saved = String(props.savedText || '').trim();
  if (saved) return saved;
  const ids = selectedIds.value;
  return ids.length ? ids.join(', ') : '';
});

/** Подсказка: сохранённые имена, пока дерево не дало свои. */
const displayTitle = computed(() => {
  const names = selectedItems.value.map((i) => i.name).filter(Boolean);
  if (names.length) return names.join(', ');
  return String(props.savedText || '').trim();
});



function fondSqlTemplate(): string {
  return props.sql || FOND_TREE_SQL;
}

async function loadLevel(options: { parentIds?: Array<number | string> }): Promise<FondNode[]> {
  const parentIds = (options?.parentIds && options.parentIds.length)
    ? options.parentIds
    : [props.rootValue ?? DEFAULT_FOND_ROOT];
  const sql = fondTreeSql(fondSqlTemplate(), parentIds);
  try {
    const res = await reportsApi.execute(props.dbName, sql);
    if (res.error) {
      treeError.value = res.error;
      return [];
    }
    treeError.value = '';
    return toNodeObjects(res.columns || [], res.rows || []);
  } catch (err) {
    treeError.value = (err as Error).message;
    return [];
  }
}

// preload (hr-fond на проде): одно выполнение itemsQuery на всё дерево.
async function loadAll(): Promise<void> {
  if (preloaded) return;
  if (preloading) return preloading;
  preloading = (async () => {
    try {
      // Шаблон может быть ленивым ({finalIds}): в preload подставляем корень,
      // иначе сервер вернёт ошибку «незаменённый плейсхолдер».
      const rootId = props.rootValue ?? DEFAULT_FOND_ROOT;
      const res = await reportsApi.execute(props.dbName, fondTreeSql(fondSqlTemplate(), [rootId]));
      if (res.error) {
        treeError.value = res.error;
        return;
      }
      treeError.value = '';
      const nodes = toNodeObjects(res.columns || [], res.rows || []);
      // В боевых данных верхние узлы ссылаются на несуществующего родителя
      // (например, PARENT = 247303). Для dxTreeList такие узлы — сироты,
      // поэтому перевешиваем их на корень, иначе дерево пустое.
      const ids = new Set(nodes.map((n: Record<string, unknown>) => Number(n.ID)));
      const root = props.rootValue ?? DEFAULT_FOND_ROOT;
      allNodes.value = nodes.map((n: Record<string, unknown>) => {
        // Сам корень не перевешиваем: PARENT = ID даёт цикл, и dxTreeList
        // выбрасывает узел вместе с поддеревом — дерево выглядит пустым.
        if (Number(n.ID) === root) return { ...n, PARENT: 0 };
        return ids.has(Number(n.PARENT)) ? n : { ...n, PARENT: root };
      }) as FondNode[];
      preloaded = true;
    } catch (err) {
      treeError.value = (err as Error).message;
    } finally {
      preloading = null;
    }
  })();
  return preloading;
}

function ensureTree() {
  if (tree || !treeEl.value) return;
  const Ctor = (window as any).MSI?.ui?.dxTreeList;
  if (!Ctor) {
    treeError.value = 'Не удалось загрузить DevExtreme (MSI.ui.dxTreeList)';
    return;
  }
  // Строка поиска. Для ленивого дерева фильтр клиентский (по загруженным
  // узлам): серверный SQL уровня {finalIds} фильтрацию не поддерживает.
  const searchOn = props.search !== false;
  tree = new Ctor(treeEl.value, {
    dataSource: usePreload.value
      ? allNodes.value
      : { load: (options: { parentIds?: Array<number | string> }) => loadLevel(options) },
    rootValue: props.rootValue ?? DEFAULT_FOND_ROOT,
    keyExpr: 'ID',
    parentIdExpr: 'PARENT',
    hasItemsExpr: 'GRP',
    remoteOperations: searchOn
      ? { filtering: false, sorting: false, paging: false }
      : { filtering: true, sorting: false, paging: false },
    selection: { mode: 'multiple', recursive: true, showCheckBoxesMode: 'always' },
    columns: [{ dataField: 'NODE', caption: 'Фонд', minWidth: 300, allowSorting: false }],
    showBorders: true,
    height: '100%',
    expandedRowKeys: [],
    onSelectionChanged: (e: any) => {
      if (syncing) return;
      stagedItems.value = (e.selectedRowsData || []).map((r: any) => ({ id: Number(r.ID), name: String(r.NODE) }));
    },
  });

  // Сборка MSI игнорирует опции поиска в опциях конструктора dxTreeList,
  // но применяет их пост-созданием. Набор — как в боевом FullTreeList:
  // строка фильтра под шапкой, панель фильтра и headerFilter.
  if (searchOn) {
    try {
      tree.option('filterRow', { visible: true });
      tree.option('filterPanel', { visible: true });
      tree.option('headerFilter', { visible: false });
    } catch { /* строка фильтра не критична */ }
  }

  // Восстанавливаем ранее выбранные значения (если они есть).
  if (selectedIds.value.length) {
    syncing = true;
    try {
      tree.selectRows(selectedIds.value, false);
    } catch { /* узлы ещё не загружены */ }
    syncing = false;
  }
}

function toggle() {
  open.value = !open.value;
}

/** «ОК»: черновой выбор становится значением фильтра. */
function okSelection() {
  selectedItems.value = [...stagedItems.value];
  emit('update:value', stagedItems.value.map((i) => i.id));
  emit('update:names', stagedItems.value.map((i) => i.name).filter(Boolean).join(', '));
  open.value = false;
}

function clear() {
  selectedItems.value = [];
  stagedItems.value = [];
  syncing = true;
  try {
    tree?.deselectAll();
  } catch { /* дерево ещё не создано */ }
  syncing = false;
  emit('update:value', []);
  emit('update:names', '');
}

onMounted(() => {
  // В предпросмотре дерево должно быть раскрыто сразу: иначе панель выглядит
  // пустой, пока пользователь не кликнет по полю.
  if (props.inline) open.value = true;
});

watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  if (usePreload.value) await loadAll();
  ensureTree();
  if (tree && !selectedIds.value.length) {
    syncing = true;
    try {
      tree.deselectAll();
    } catch { /* ignore */ }
    syncing = false;
  }
  stagedItems.value = [...selectedItems.value];
  if (tree) {
    syncing = true;
    try {
      tree.selectRows(selectedIds.value, false);
    } catch { /* ignore */ }
    syncing = false;
    // Имена узлов могли не знать при прошлом закрытии: подтягиваем из дерева.
    setTimeout(() => {
      syncing = true;
      try {
        const rows = (tree.getSelectedRowsData() || []).map((r: any) => ({ id: Number(r.ID), name: String(r.NODE) }));
        if (rows.length) stagedItems.value = rows;
      } catch { /* ignore */ }
      syncing = false;
    }, 200);
  }
});

// Внешний сброс/смена значения (например, кнопка «Сбросить» панели).
watch(() => props.value, (ids) => {
  if (!tree) return;
  if (!ids || !ids.length) {
    syncing = true;
    try {
      tree.deselectAll();
    } catch { /* ignore */ }
    syncing = false;
    selectedItems.value = [];
    stagedItems.value = [];
  }
});

// ─── Ресайз панели за нижний правый угол ────────────────────────────────────

let resizing = false;
let resizeStartX = 0;
let resizeStartY = 0;
let resizeStartW = 0;
let resizeStartH = 0;

function onResizeMove(event: MouseEvent) {
  if (!resizing) return;
  panelW.value = Math.min(window.innerWidth * 0.9,
    Math.max(420, resizeStartW + (event.clientX - resizeStartX)));
  panelH.value = Math.min(window.innerHeight * 0.85,
    Math.max(280, resizeStartH + (event.clientY - resizeStartY)));
  try {
    tree?.updateDimensions?.();
  } catch { /* дерево ещё не создано */ }
}

function onResizeUp() {
  resizing = false;
  document.removeEventListener('mousemove', onResizeMove);
  document.removeEventListener('mouseup', onResizeUp);
}

function startResize(event: MouseEvent) {
  const panel = rootEl.value?.querySelector('.fond-tree__panel') as HTMLElement | null;
  if (!panel) return;
  resizing = true;
  resizeStartX = event.clientX;
  resizeStartY = event.clientY;
  resizeStartW = panel.offsetWidth;
  resizeStartH = panel.offsetHeight;
  document.addEventListener('mousemove', onResizeMove);
  document.addEventListener('mouseup', onResizeUp);
}

function onDocumentClick(event: MouseEvent) {
  if (!open.value) return;
  const root = rootEl.value;
  if (root && !root.contains(event.target as Node)) open.value = false;
}

document.addEventListener('mousedown', onDocumentClick);

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onResizeMove);
  document.removeEventListener('mouseup', onResizeUp);
  document.removeEventListener('mousedown', onDocumentClick);
  try {
    tree?.dispose();
  } catch { /* ignore */ }
  tree = null;
});
</script>

<style scoped lang="scss">
.fond-tree {
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

  &--inline &__panel {
    position: static;
    width: 100%;
    margin-top: 6px;
    padding: 4px;
    background: transparent;
    box-shadow: none;
  }

  &--inline &__tree {
    max-height: 260px;
  }

  &__panel {
    position: absolute;
    z-index: 1200;
    top: calc(100% + 4px);
    left: 0;
    width: max(420px, 100%);
    display: flex;
    flex-direction: column;
    background: var(--dx-color-main-bg, #fff);
    border: 1px solid rgba(128, 128, 128, 0.35);
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    padding: 6px;
  }

  &__tree {
    flex: 1 1 auto;
    height: 340px;
    min-height: 200px;
    overflow: auto;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 4px 0;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
    flex: 0 0 auto;
  }

  &__count {
    margin-right: auto;
    font-size: 12px;
    opacity: 0.75;
  }

  &__resizer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;

    &::after {
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 8px;
      height: 8px;
      border-right: 2px solid rgba(128, 128, 128, 0.6);
      border-bottom: 2px solid rgba(128, 128, 128, 0.6);
      content: "";
    }

    &:hover::after {
      border-color: var(--dx-color-primary, #337ab7);
    }
  }


  &__error {
    color: var(--dx-color-danger, #d9534f);
    font-size: 12px;
    padding: 6px 8px;
    white-space: pre-wrap;
  }
}
</style>
