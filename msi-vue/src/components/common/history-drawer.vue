<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="hd"
      @click.self="$emit('close')"
    >
      <aside class="hd__panel theme-dependent">
        <header class="hd__head">
          <div class="hd__title">
            История: {{ title }}
          </div>
          <button
            type="button"
            class="hd__close"
            @click="$emit('close')"
          >
            ×
          </button>
        </header>

        <div
          v-if="!items.length"
          class="hd__empty"
        >
          Изменений пока нет
        </div>

        <ul
          v-else
          class="hd__list"
        >
          <li
            v-for="(item, index) in items"
            :key="item.id ?? index"
            class="hd__item"
          >
            <div class="hd__row">
              <span
                class="hd__action"
                :class="actionClass(item.action)"
              >{{ actionLabel(item.action) }}</span>
              <span class="hd__when">{{ formatDate(item.at) }}</span>
            </div>
            <div class="hd__row hd__row--muted">
              <span>{{ item.by || 'неизвестно' }}</span>
            </div>
            <pre
              v-if="item.detail"
              class="hd__detail"
            >{{ item.detail }}</pre>
          </li>
        </ul>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Боковая панель истории изменений: общая для фильтров и запросов.
// Список формирует страница — компонент только показывает.

export interface HistoryItem {
  id?: number | string;
  action: string;
  at?: string;
  by?: string;
  detail?: string;
}

const props = defineProps<{
  visible: boolean;
  title: string;
  items: HistoryItem[];
}>();

defineEmits<{ close: [] }>();

function actionLabel(action: string): string {
  switch (action) {
    case 'create': return 'создан';
    case 'update': return 'изменён';
    case 'delete': return 'удалён';
    case 'run': return 'запуск';
    default: return action || '—';
  }
}

function actionClass(action: string): string {
  return `hd__action--${action || 'other'}`;
}

function formatDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
</script>

<style scoped>
.hd {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  justify-content: flex-end;
  background: rgba(15, 23, 42, 0.32);
}

.hd__panel {
  color: var(--dx-color-text, #1f2937);
  display: flex;
  flex-direction: column;
  width: 360px;
  max-width: 92vw;
  height: 100%;
  background: var(--dx-color-main-bg, #fff);
  border-left: 1px solid var(--dx-color-border, #e5e7eb);
  box-shadow: -8px 0 24px rgba(15, 23, 42, 0.12);
}

.hd__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
}

.hd__title {
  font-size: 13px;
  font-weight: 600;
}

.hd__close {
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.hd__close:hover {
  background: rgba(148, 163, 184, 0.2);
}

.hd__empty {
  padding: 16px;
  font-size: 12px;
  opacity: 0.7;
}

.hd__list {
  margin: 0;
  padding: 8px 12px;
  overflow: auto;
  list-style: none;
}

.hd__item {
  padding: 8px 0;
  border-bottom: 1px dashed var(--dx-color-border, #e5e7eb);
}

.hd__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
}

.hd__row--muted {
  margin-top: 2px;
  font-size: 11px;
  opacity: 0.6;
}

.hd__action {
  padding: 1px 8px;
  border-radius: 999px;
  font-size: 11px;
  background: rgba(148, 163, 184, 0.2);
}

.hd__action--create {
  background: rgba(34, 197, 94, 0.18);
}

.hd__action--update {
  background: rgba(59, 130, 246, 0.18);
}

.hd__action--delete {
  background: rgba(239, 68, 68, 0.18);
}

.hd__detail {
  margin: 6px 0 0;
  padding: 6px 8px;
  max-height: 160px;
  overflow: auto;
  font-size: 11px;
  white-space: pre-wrap;
  word-break: break-word;
  background: rgba(148, 163, 184, 0.12);
  border-radius: 6px;
}
</style>
