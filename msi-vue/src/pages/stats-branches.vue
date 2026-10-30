<template>
  <div class="view-wrapper dashboard-empty">
    <div class="dashboard-empty__inner">
      <div class="dashboard-empty__title">По филиалам</div>
      <div class="dashboard-empty__hint">Форма пока не заполнена</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Пустая страница-заглушка: содержимое появится позже.
</script>

<style scoped>
.dashboard-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.dashboard-empty__inner {
  text-align: center;
  opacity: 0.72;
}

.dashboard-empty__title {
  font-size: 18px;
  font-weight: 600;
}

.dashboard-empty__hint {
  margin-top: 6px;
  font-size: 13px;
}
</style>
