<template>
  <div class="side-nav-outer-toolbar">
    <app-header
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    
    <div
      class="layout-body"
      :class="{ 'menu-opened': menuOpened, 'menu-overlap': !isLarge }"
      :style="{ '--side-panel-width': `${menuWidth}px` }"
    >
      <!-- Р›РµРІРѕРµ РјРµРЅСЋ -->
      <div
        class="layout-menu"
        :class="{ 'menu-closed': !menuOpened, 'is-resizing': menuResizing }"
      >
        <side-navigation-menu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        />

        <!-- Шторка: тянем за правый край панели и меняем её ширину. -->
        <div
          v-if="menuOpened && isLarge"
          class="layout-menu__grip"
          role="separator"
          aria-orientation="vertical"
          title="Потяните, чтобы изменить ширину панели"
          @pointerdown="startResize"
        />
      </div>

      <!-- РљРѕРЅС‚РµРЅС‚ -->
      <div class="layout-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DxButtonTypes } from 'devextreme-vue/button';
import AppHeader from '@/components/library/app-header.vue';
import SideNavigationMenu from '@/components/library/side-navigation-menu.vue';
import {
  initSideMenu,
  setSideMenuWidth,
  sideMenuOpened as menuOpened,
  sideMenuWidth as menuWidth,
} from '@/composables/use-side-menu';

const props = withDefaults(defineProps<{
  title: string,
  isXSmall: boolean,
  isLarge: boolean,
}>(), {
  title: '',
});

const route = useRoute();
// Состояние панели общее со страницами: отчёт после успешной загрузки данных
// сворачивает меню, чтобы освободить место таблице/своду.
initSideMenu(props.isLarge);
const menuTemporaryOpened = ref(false);

watch(
  () => props.isLarge,
  () => {
    if (!menuTemporaryOpened.value) {
      menuOpened.value = props.isLarge;
    }
  },
);

watch(
  () => route.path,
  () => {
    if (menuTemporaryOpened.value || !props.isLarge) {
      menuOpened.value = false;
      menuTemporaryOpened.value = false;
    }
  },
);

function toggleMenu({ event }: DxButtonTypes.ClickEvent) {
  event?.stopPropagation();

  if (menuOpened.value) {
    menuTemporaryOpened.value = false;
  }
  menuOpened.value = !menuOpened.value;
}

function handleSideBarClick() {
  if (menuOpened.value === false) {
    menuTemporaryOpened.value = true;
  }
  menuOpened.value = true;
}

// ── Ресайз боковой панели («шторка» за правым краем) ────────────────────────

const menuResizing = ref(false);


/** Тянем шторку: ширина панели следует за курсором, в пределах MIN/MAX. */
function startResize(event: PointerEvent): void {
  if (!props.isLarge) {
    return;
  }
  event.preventDefault();

  const startX = event.clientX;
  const startWidth = menuWidth.value;

  const onMove = (e: PointerEvent) => {
    setSideMenuWidth(startWidth + (e.clientX - startX));
  };

  const onUp = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    menuResizing.value = false;
    document.body.classList.remove('is-resizing-menu');
  };

  menuResizing.value = true;
  document.body.classList.add('is-resizing-menu');
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
}
</script>

<style scoped lang="scss">
@use '@/variables' as *;

.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}

.layout-body {
  flex: 1;
  min-height: 0;
  background-color: var(--background-color);
  display: flex;
  position: relative;
  overflow: hidden;
}

.layout-menu {
  position: relative;
  height: 100%;
  background-color: var(--side-panel-background);
  border-right: 1px solid var(--border-color);
  width: var(--side-panel-width, 250px);
  flex-shrink: 0;
  transition: width 0.2s ease, transform 0.2s ease;
  overflow: hidden;

  &.menu-closed {
    width: 48px;
  }

  // Пока тянем шторку — ширина без анимации, иначе панель «догоняет» курсор.
  &.is-resizing {
    transition: none;
  }

  // Шторка: узкая полоса у правого края, за неё тянем — меняем ширину.
  &__grip {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    width: 6px;
    cursor: col-resize;
    background-color: transparent;
    transition: background-color 0.15s ease;

    &::after {
      position: absolute;
      top: 50%;
      left: 1px;
      width: 4px;
      height: 40px;
      border-radius: 2px;
      content: "";
      background-color: var(--border-color);
      transform: translateY(-50%);
    }

    &:hover,
    &:active {
      background-color: color-mix(in srgb, var(--border-color), var(--base-text-color) 25%);
    }
  }
}

// Пока тянем шторку — курсор и выделение фиксированы.
:global(body.is-resizing-menu) {
  cursor: col-resize;
  user-select: none;
}

.menu-overlap .layout-menu {
  position: absolute;
  z-index: 100;
  box-shadow: 4px 0 8px rgba(0,0,0,0.1);

  &.menu-closed {
    transform: translateX(-100%);
    width: var(--side-panel-width, 250px); /* Keep width when sliding out */
  }
}

.layout-content {
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  overflow: auto;
}
</style>