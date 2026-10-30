<template>
  <nav
    v-if="items.length"
    class="app-breadcrumbs"
    aria-label="Путь к странице"
  >
    <template
      v-for="(crumb, index) in items"
      :key="`${crumb.text}-${index}`"
    >
      <a
        v-if="index < items.length - 1 && crumb.path"
        class="app-breadcrumbs__item app-breadcrumbs__link"
        :title="crumb.text"
        @click.prevent="$emit('navigate', crumb.path)"
      >{{ crumb.text }}</a>
      <span
        v-else
        class="app-breadcrumbs__item"
        :class="{ 'is-current': index === items.length - 1 }"
        :title="crumb.text"
      >{{ crumb.text }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '@/composables/use-breadcrumbs';

// Компонент намеренно «глупый»: крошки считает шапка и передаёт готовый
// список. DevExtreme рендерит шаблоны пунктов тулбара вне контекста
// приложения, поэтому useRoute()/inject() внутри такого шаблона недоступны.
defineProps<{
  items: Breadcrumb[],
}>();

defineEmits<{
  navigate: [string],
}>();
</script>

<style scoped lang="scss">
// Крошки-«лента»: сегменты со скошенными краями (как стрелки), без отдельных
// разделителей. Форма — clip-path, а цвета — токены MSI, поэтому лента
// одинаково читается в светлой и тёмной теме.
.app-breadcrumbs {
  --crumb-arrow: 9px;
  --crumb-bg: var(--dx-color-primary, #0f6cbd);
  --crumb-bg-hover: color-mix(in srgb, var(--dx-color-primary, #0f6cbd) 30%, var(--base-bg, #fff));
  --crumb-fg: #fff;
  --crumb-fg-hover: var(--base-text-color, #000);

  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 26px;
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  line-height: 26px;

  &__item {
    position: relative;
    flex: 0 1 auto;
    min-width: 0;
    max-width: 22ch;
    padding: 0 12px 0 calc(var(--crumb-arrow) + 10px);
    overflow: hidden;
    color: var(--crumb-fg);
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: var(--crumb-bg);
    transition: background-color 0.2s ease, color 0.2s ease;
    clip-path: polygon(
      0 0,
      calc(100% - var(--crumb-arrow)) 0,
      100% 50%,
      calc(100% - var(--crumb-arrow)) 100%,
      0 100%,
      var(--crumb-arrow) 50%
    );

    // Первый сегмент — с ровным левым краем, последний — с ровным правым.
    &:first-child {
      padding-left: 10px;
      clip-path: polygon(
        0 0,
        calc(100% - var(--crumb-arrow)) 0,
        100% 50%,
        calc(100% - var(--crumb-arrow)) 100%,
        0 100%
      );
    }

    &:last-child {
      padding-right: 14px;
      font-weight: 500;
      clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        0 100%,
        var(--crumb-arrow) 50%
      );
    }

    &.is-current {
      max-width: 40ch;
    }
  }

  &__link {
    cursor: pointer;

    &:hover {
      --crumb-bg: var(--crumb-bg-hover);
      --crumb-fg: var(--crumb-fg-hover);
    }
  }
}
</style>
