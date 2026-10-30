<template>
  <!-- Обёртка msi-vue не переносит class на корень виджета, поэтому
       позиционирующий класс вешаем на этот div. -->
  <div class="palette-switcher">
    <dx-drop-down-button
      icon="palette"
      styling-mode="text"
      hint="Цветовая схема"
      :items="palettes"
      key-expr="id"
      display-expr="name"
      :drop-down-options="{ width: menuWidth }"
      :on-item-click="onPick"
    >
      <template #item="{ data }">
        <span class="palette-switcher__item">
          <span
            class="palette-switcher__dot"
            :style="{ background: data.accent }"
          />
          <span class="palette-switcher__name">{{ data.name }}</span>
          <i
            v-if="data.id === current"
            class="dx-icon dx-icon-check palette-switcher__check"
          />
        </span>
      </template>
    </dx-drop-down-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import { PALETTES, themeService, type PaletteId } from '@/theme/theme-service';

// Кнопка-палитра в тулбаре: выпадающий список цветовых схем MSI.
// Смена палитры перезагружает страницу (theme-service) — MSI кэширует
// семейство темы при загрузке, поэтому живая подмена href не даёт
// консистентного состояния. Stateless-кнопке пересборка тулбара не мешает.

const palettes = PALETTES;
const current = computed<PaletteId>(() => themeService.currentPalette.value);

/** Ширина меню — по самому длинному названию. DX DropDownButton не
 * принимает width:'auto' для popup (заменяет шириной кнопки), поэтому
 * меряем текст канвасом и отдаём пиксели. */
const menuWidth = (() => {
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return 220;
    ctx.font = '14px Roboto, Arial, sans-serif';
    const longest = Math.max(...PALETTES.map((p) => ctx.measureText(p.name).width));
    // Кружок 14 + два промежутка 16 + галочка 14 + поля списка ~36.
    return Math.ceil(longest) + 14 + 16 + 14 + 36;
  } catch {
    return 220;
  }
})();

function onPick(e: { itemData?: { id?: string } }) {
  const id = e.itemData?.id;
  if (id) themeService.setAppPalette(id as PaletteId);
}
</script>

<style scoped>
/* Иконка кнопки подсвечивается акцентом активной схемы. */
.palette-switcher :deep(.dx-icon) {
  color: var(--dx-color-primary, #5486ff);
}

.palette-switcher__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  /* Ширина меню — по самому длинному названию (popup width: auto). */
  white-space: nowrap;
}

.palette-switcher__dot {
  flex: none;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
}

.palette-switcher__name {
  flex: 1 1 auto;
}

.palette-switcher__check {
  flex: none;
  color: var(--dx-color-primary, #5486ff);
}
</style>
