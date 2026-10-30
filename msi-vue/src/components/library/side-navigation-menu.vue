<template>
  <div
    class="dx-swatch-additional side-navigation-menu"
    :class="{ 'is-compact': compactMode }"
    @click="forwardClick"
  >
    <slot />
    <div class="menu-container theme-dependent">
      <!-- Прокрутка меню — штатный ScrollView из msi.js, а не браузерная. -->
      <dx-scroll-view
        :element-attr="{ class: 'menu-scroll' }"
        :show-scrollbar="'onHover'"
        :scroll-by-content="true"
        :bounce-enabled="false"
      >
        <!-- Всё меню — один dxTreeView: «Список отчетов» с иерархией отчётов
             и статические разделы. Первый раздел — настоящий узел меню
             (`li.dx-treeview-node`), а не отдельная кнопка над списком. -->
        <dx-tree-view
          ref="treeViewRef"
          :items="items"
          key-expr="id"
          selection-mode="single"
          :focus-state-enabled="false"
          :scroll-enabled="false"
          expand-event="click"
          @item-click="handleItemClick"
          @item-rendered="onItemRendered"
          @content-ready="onTreeContentReady"
          @item-expanded="onTreeItemExpanded"
          @item-collapsed="onTreeItemCollapsed"
          width="100%"
        />
      </dx-scroll-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import DxTreeView, { type DxTreeViewTypes } from 'devextreme-vue/tree-view';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { sizes } from '@/utils/media-query';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { navigationItems, refreshNavigation, reportMenuRows, type ReportMenuRow } from '@/composables/use-navigation';
import type { SideNavigationItem } from '@/types';

const route = useRoute();
const router = useRouter();

const isLargeScreen = sizes()['screen-large'];

/** Узел меню: статический пункт или узел иерархии отчётов. */
type MenuNode = SideNavigationItem & {
  /** Тип узла иерархии отчётов — для стилей и клика. */
  kind?: 'root' | 'section' | 'report';
};

// Нормализует путь (всегда с ведущим «/»), задаёт уникальный ключ узла и
// раскрывает разделы на больших экранах. Уникальный ключ нужен потому, что у
// групп path пустой — на key-expr="path" такие узлы конфликтуют между собой.
function normalizeItem(item: SideNavigationItem): MenuNode {
  const path = item.path && !(/^\//.test(item.path)) ? `/${item.path}` : item.path;
  const id = path || `group:${item.icon || ''}:${item.text}`;
  return {
    ...item,
    path,
    id,
    expanded: isLargeScreen,
    items: item.items?.map(normalizeItem),
  };
}

/** Узлы иерархии отчётов: разделы — ветки, отчёты — листья. */
function reportNodes(rows: ReportMenuRow[], parentId: string | null): MenuNode[] {
  return rows
    .filter((row) => row.parentId === parentId)
    .map((row) => {
      const children = row.kind === 'section' ? reportNodes(rows, row.id) : [];
      return {
        // Ключ — путь пункта: по нему dxTreeView выделяет активный узел
        // (пути разделов и отчётов уникальны).
        id: row.path,
        text: row.text,
        path: row.path,
        icon: row.icon,
        kind: row.kind,
        // Разделы раскрыты по умолчанию, как и в прежнем списке.
        expanded: row.kind === 'section' ? true : undefined,
        items: children.length ? children : undefined,
      };
    });
}

// Меню реактивное: раздел «Список отчетов» с иерархией отчётов из API плюс
// статические разделы. Всё — один dxTreeView, поэтому первый раздел меню
// является обычным узлом дерева (li.dx-treeview-node), как и остальные.
const items = computed<MenuNode[]>(() => [
  {
    id: 'menu:reports',
    text: 'Список отчетов',
    path: '',
    icon: 'chart',
    kind: 'root',
    expanded: true,
    items: reportNodes(reportMenuRows.value, null),
  },
  ...navigationItems.value.map(normalizeItem),
]);

const treeViewRef = ref<InstanceType<typeof DxTreeView> | null>(null);

const props = defineProps<{
  compactMode: boolean,
}>();

const emit = defineEmits(['click']);

function forwardClick(...args: unknown[]) {
  emit('click', args);
}

function handleItemClick(e: DxTreeViewTypes.ItemClickEvent<MenuNode>) {
  const item = e.itemData;
  // В свёрнутом меню клик по любому месту лишь разворачивает панель.
  if (props.compactMode || !item?.path) {
    return;
  }
  // Раздел отчётов и группы статического меню только раскрываются —
  // это делает expand-event="click", перехода по ним нет.
  if (item.kind === 'section' || item.items?.length) {
    return;
  }
  router.push(item.path);

  e.event?.stopPropagation();
}

// route.path приходит percent-encoded (например, /report/%D0%9A...), а пути в
// меню — в читаемом виде, поэтому сравниваем по декодированному пути.
function activePath(): string {
  let path = route.path;
  try {
    path = decodeURIComponent(path);
  } catch {
    // оставляем как есть
  }
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/** Помечает узел отчётов классом — по нему настраиваются отступы и стили. */
function onItemRendered(e: { itemData?: MenuNode, itemElement?: HTMLElement }): void {
  const kind = e.itemData?.kind;
  const element = e.itemElement;
  if (!kind || !element) {
    return;
  }
  element.classList.toggle('menu-node--root', kind === 'root');
  element.classList.toggle('menu-node--section', kind === 'section');
  element.classList.toggle('menu-node--report', kind === 'report');
  if (e.itemData?.text) {
    element.title = e.itemData.text;
  }
}

/** Выделяет пункт меню, соответствующий текущему маршруту. */
function updateSelection(): void {
  const instance = treeViewRef.value?.instance;
  if (instance && typeof instance.selectItem === 'function') {
    instance.selectItem(activePath());
  }
}

// Цепочка разделов-предков активного пункта (корень → родитель) и сам пункт.
function activeChain(): { chain: string[]; item: SideNavigationItem | null } {
  const target = activePath();
  let found: SideNavigationItem | null = null;
  const chain: string[] = [];
  const walk = (list: SideNavigationItem[], parents: string[]): boolean => {
    for (const node of list) {
      const id = node.id || node.path || '';
      const withSelf = id ? [...parents, id] : parents;
      if (node.path && node.path === target) {
        found = node;
        chain.push(...parents);
        return true;
      }
      if (node.items?.length && walk(node.items, withSelf)) {
        return true;
      }
    }
    return false;
  };
  walk(items.value, []);
  return { chain, item: found };
}

function expandAncestors(): void {
  const instance = treeViewRef.value?.instance;
  if (!instance || typeof instance.expandItem !== 'function') {
    return;
  }
  activeChain().chain.forEach((id) => instance.expandItem(id));
}

/**
 * При открытии страницы из меню (лист, не раздел) все разделы, кроме цепочки
 * к активному пункту, сворачиваются: раскрытым остаётся только
 * непосредственный родитель и его предки. Переход на страницу раздела
 * ничего не сворачивает; ручное раскрытие не отменяется — функция
 * вызывается только при навигации и перестройке меню.
 */
function collapseOtherSections(): void {
  const instance = treeViewRef.value?.instance;
  if (!instance || typeof instance.collapseItem !== 'function') {
    return;
  }
  const { chain, item } = activeChain();
  // Нет активного пункта или это раздел (папка) — меню не трогаем.
  if (!item || item.items?.length) {
    return;
  }
  const keep = new Set(chain);
  const collapse = (list: SideNavigationItem[]): void => {
    for (const node of list) {
      if (!node.items?.length) {
        continue;
      }
      const id = node.id || node.path || '';
      if (id && !keep.has(id)) {
        try {
          instance.collapseItem(id);
        } catch {
          /* узел ещё не отрисован — не критично */
        }
      }
      collapse(node.items);
    }
  };
  collapse(items.value);
}

function syncSelection() {
  expandAncestors();
  collapseOtherSections();
  updateSelection();
}

// MSI's dxTreeView appends the expand toggle to the node (li), not to the
// item row like the theme's flex layout expects (order: 0 + row-reverse),
// so on its own it falls onto a separate line under the item. Move the
// toggle into .dx-treeview-item after every render; the move is idempotent
// (already-moved toggles no longer match the selector below).
//
// Перенесённый шеврон DevExtreme больше не обновляет: класс
// «-opened» (а с ним и начертание глифа) ставится только элементу, который
// остался в узле. Поэтому состояние шеврона синхронизируем сами — по
// aria-expanded узла. Клики обрабатывает сам виджет (делегированный
// обработчик на корне дерева), поэтому свои обработчики не нужны.
function syncTreeToggles(): void {
  const root = treeViewRef.value?.$el as HTMLElement | undefined;
  if (!root) {
    return;
  }

  root.querySelectorAll('.dx-treeview-toggle-item-visibility').forEach((toggle) => {
    const node = toggle.closest('.dx-treeview-node');
    const item = node?.querySelector(':scope > .dx-treeview-item');
    if (!node || !item) {
      return;
    }
    const expanded = node.getAttribute('aria-expanded') === 'true';
    if (toggle.parentElement !== item) {
      // Перерисованный узел мог оставить в строке старый шеврон — убираем.
      item.querySelectorAll(':scope > .dx-treeview-toggle-item-visibility')
        .forEach((stale) => stale.remove());
      // Переносим копию, а не сам элемент: у исходного шеврона остались
      // прямые обработчики DevExtreme, привязанные к прежнему месту, и они
      // «съедают» клик. Копия без обработчиков обрабатывается делегированным
      // обработчиком виджета — как обычный шеврон.
      const moved = toggle.cloneNode(true) as HTMLElement;
      moved.classList.toggle('dx-treeview-toggle-item-visibility-opened', expanded);
      item.appendChild(moved);
      toggle.remove();
      return;
    }
    toggle.classList.toggle('dx-treeview-toggle-item-visibility-opened', expanded);
  });
}

function onTreeContentReady(): void {
  syncTreeToggles();
}

// Раскрытие узла пользователем — только переставляем шеврон. Ветку активного
// отчёта НЕ разворачиваем и выделение не перетаскиваем: маршрут при кликах по
// разделам не меняется, и принудительный syncSelection раскрывал бы свернутый
// пользователем раздел с активным отчётом при каждом клике по любому разделу.
// Выделение синхронизируется при навигации (watch route), перестройке меню
// (watch items) и монтировании.
function onTreeItemExpanded(): void {
  void nextTick(() => {
    syncTreeToggles();
  });
}

function onTreeItemCollapsed(e: { itemData?: MenuNode }): void {
  void nextTick(() => {
    syncTreeToggles();
    // Активный пункт скрылся вместе с разделом — подсвечиваем сам раздел,
    // иначе в меню не видно, где мы находимся.
    const item = e.itemData;
    if (item?.id && item.items?.length && nodeContainsPath(item, activePath())) {
      const instance = treeViewRef.value?.instance;
      if (instance && typeof instance.selectItem === 'function') {
        instance.selectItem(item.id);
      }
    }
  });
}

/** Есть ли в поддереве узла пункт с указанным путём. */
function nodeContainsPath(node: MenuNode, path: string): boolean {
  if (node.path === path) {
    return true;
  }
  return (node.items as MenuNode[] | undefined)?.some((child) => nodeContainsPath(child, path)) ?? false;
}

/**
 * Сворачивает дерево до верхних разделов: в свёрнутой панели (48 px) видны
 * только корневые пункты. При раскрытии панель сама раскроет ветку до
 * активного пункта.
 */
function collapseMenu(): void {
  const instance = treeViewRef.value?.instance;
  if (instance && typeof instance.collapseAll === 'function') {
    instance.collapseAll();
  }
}

/** Прокручивает меню к выделенному пункту (после раскрытия панели). */
function scrollToActive(): void {
  const root = treeViewRef.value?.$el as HTMLElement | undefined;
  const node = root?.querySelector('.dx-treeview-node[aria-selected="true"]') as HTMLElement | null;
  node?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

onMounted(() => {
  refreshNavigation(activePath());
  syncSelection();
  if (props.compactMode) {
    collapseMenu();
  }
});

watch(
  () => route.path,
  () => {
    // Маршрут определяет активный раздел (например, при переходе по прямой
    // ссылке на отчёт меню должно показать его раздел).
    refreshNavigation(activePath());
    syncSelection();
  },
);

// Список меню приходит асинхронно из API — после подгрузки переставляем выделение.
watch(items, () => {
  void nextTick(() => syncSelection());
});

watch(
  () => props.compactMode,
  () => {
    if (props.compactMode) {
      collapseMenu();
    } else {
      // Раскрываем ветку до активного пункта и показываем его в окне меню:
      // после свёртки список стоял на верхних разделах.
      syncSelection();
      const instance = treeViewRef.value?.instance;
      if (instance && typeof instance.expandItem === 'function') {
        instance.expandItem(activePath());
      }
      window.setTimeout(() => {
        syncTreeToggles();
        scrollToActive();
      }, 260);
    }
  },
);
</script>

<style scoped lang="scss">
:root {
  --toolbar-vertical-padding: 16px;
}

:root .dx-theme-generic {
  --change-password-popup-height: 190px;
}

// ── Боковое меню ───────────────────────────────────────────────────────────
// Элементы dxTreeView/dxTreeList создаёт виджет — scope-атрибута они не несут,
// поэтому селекторы к ним идут через :deep.

.side-navigation-menu {
  display: flex;
  flex-direction: column;
  width: var(--side-panel-width, 250px) !important;
  height: 100%;
  min-height: 100%;
  font-family: Roboto, RobotoFallback, 'Noto Kufi Arabic', Helvetica, Arial, sans-serif;

  &:deep(.menu-container) {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    padding-top: var(--toolbar-vertical-padding);
    padding-bottom: var(--footer-height);
    overflow: hidden;
    background-color: var(--side-panel-background);

    // Прокрутка — ScrollView из msi.js (собственный скроллбар виджета).
    .menu-scroll {
      flex: 1 1 auto;
      min-height: 0;
    }

    // ## Long text positioning
    .dx-treeview {
      white-space: nowrap;
      // ##
      // ## Icon width customization
      .dx-treeview-item {
        padding-left: 0;
        flex-direction: row-reverse;
        border-radius: 0;

        .dx-icon {
          width: var(--side-panel-min-width) !important;
          margin: 0 !important;
        }
      }
      // ##
      // ## Arrow customization
      // MSI's dxTreeView appends the expand toggle to the node (li), not to the
      // item row, so on its own it falls onto a separate line under the
      // item. onTreeContentReady moves it into .dx-treeview-item on every
      // render; the theme's flex layout (order: 0 + the row-reverse above)
      // then keeps it inline at the right edge of the row.
      .dx-treeview-node {
        padding: 0 0 !important;
      }
      // ##
      // ## Item levels customization
      .dx-treeview-node {
        &[aria-level="1"] {
          font-weight: bold;
          border-bottom: 1px solid var(--border-color);
        }
        &[aria-level="2"] .dx-treeview-item-content {
          font-weight: normal;
          padding: 0 0 0 var(--side-panel-min-width);
        }
      }
      // ##

      // ── Иерархия отчётов — те же узлы dxTreeView, что и статические
      // разделы (классы ставит onItemRendered) ──────────────────────────────
      .dx-treeview-item.menu-node--root,
      .dx-treeview-item.menu-node--section,
      .dx-treeview-item.menu-node--report {
        height: 48px;
        font-size: 14px;
        line-height: 18px;
      }

      // «Список отчетов» и разделы отчётов — как корневые пункты меню:
      // иконка в колонке 48 px, текст сразу за ней, без ступеньки темы.
      .dx-treeview-item.menu-node--root .dx-treeview-item-content,
      .dx-treeview-item.menu-node--section .dx-treeview-item-content {
        padding-left: 0;
        font-weight: bold;
      }

      // Отчёты — на шаг правее раздела: иконка и текст сдвинуты вместе.
      .dx-treeview-item.menu-node--report .dx-treeview-item-content {
        padding-left: 28px;
      }

      // Длинные названия обрезаются многоточием, а не растягивают строку
      // (иначе содержимое уезжает влево за край панели).
      .dx-treeview-item.menu-node--root .dx-treeview-item-content,
      .dx-treeview-item.menu-node--section .dx-treeview-item-content,
      .dx-treeview-item.menu-node--report .dx-treeview-item-content {
        display: flex;
        align-items: center;
        min-width: 0;
        overflow: hidden;

        .dx-icon {
          flex: none;
        }

        span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    // ##
  }
  // ##

  // Свёрнутое меню (48 px, только иконки): у пунктов отчётов убираем
  // ступеньку, чтобы иконки стояли в той же колонке, что и остальные.
  &.is-compact {
    &:deep(.menu-container .dx-treeview .dx-treeview-item.menu-node--report .dx-treeview-item-content) {
      padding-left: 0;
    }
  }
}

// Тень у выезжающей панели — как в стартовом шаблоне.
.dx-drawer-overlap .side-navigation-menu {
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2000;
    height: 10px;
    content: "";
    pointer-events: none;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2000;
    height: 2px;
    content: "";
    pointer-events: none;
    background: linear-gradient(rgba(0, 0, 0, 0.15), transparent);
  }
}
</style>
