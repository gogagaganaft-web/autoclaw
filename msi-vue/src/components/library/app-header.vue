<template>
  <!-- Тулбар пересобирается по key вместе с крошками: DevExtreme кэширует
       содержимое пунктов и сам изменения внутри слота не подхватывает. -->
  <header>
    <dx-toolbar
      :key="crumbsKey"
      class="header-toolbar"
    >
      <dx-item
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <template #default>
          <dx-button
            icon="menu"
            styling-mode="text"
            @click="toggleMenuFunc"
          />
        </template>
      </dx-item>

      <!-- Единая строка: «Генератор отчетов > Отчёты > ОРН > Платежи».
           Название приложения — первая крошка, поэтому размер шрифта у всех
           пунктов одинаковый. -->
      <dx-item
        v-if="headerCrumbs.length"
        location="before"
        css-class="header-breadcrumbs"
      >
        <template #default>
          <app-breadcrumbs
            :items="headerCrumbs"
            @navigate="openCrumb"
          />
        </template>
      </dx-item>
      <dx-item
        v-else-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div>{{ title }}</div>
      </dx-item>
      <dx-item
        location="after"
        locate-in-menu="auto"
        widget="dxTextBox"
        css-class="global-search-box"
        :options="{
          stylingMode: 'filled',
          mode: 'search',
          placeholder: 'Search',
          width: 180,
        }"
      />
      <dx-item
        location="after"
        locate-in-menu="never"
      >
        <theme-switcher />
      </dx-item>
      <dx-item
        location="after"
        locate-in-menu="never"
      >
        <palette-switcher />
      </dx-item>
      <dx-item location="after">
        <div class="messages">
          <dx-button
            icon="belloutline"
            styling-mode="text"
          />
          <div class="dx-badge">
            4
          </div>
        </div>
      </dx-item>
      <dx-item
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
        <template #default>
          <header-user @logout="onLogoutClick" />
        </template>
      </dx-item>

      <template #menuUserItem>
        <header-user @logout="onLogoutClick" />
      </template>
    </dx-toolbar>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { DxButton, DxButtonTypes } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { authInfo as auth, UserInfo, AuthUser } from '../../auth';
import HeaderUser from './header-user.vue';
import ThemeSwitcher from './theme-switcher.vue';
import PaletteSwitcher from './palette-switcher.vue';
import AppBreadcrumbs from './app-breadcrumbs.vue';
import { useBreadcrumbs } from '@/composables/use-breadcrumbs';

const router = useRouter();
const route = useRoute();
const { breadcrumbs } = useBreadcrumbs();

const props = defineProps<{
  menuToggleEnabled: boolean,
    title: string,
    toggleMenuFunc:(e: DxButtonTypes.ClickEvent) => void,
}>();

/**
 * Крошки шапки: название приложения + путь по меню. Единый список — значит
 * единый размер шрифта и одинаковые разделители между всеми пунктами.
 */
const headerCrumbs = computed(() => {
  if (!breadcrumbs.value.length) return [];
  return props.title
    ? [{ text: props.title }, ...breadcrumbs.value]
    : breadcrumbs.value;
});

/** Ключ пересборки тулбара: меняется вместе с крошками. */
const crumbsKey = computed(() => headerCrumbs.value.map((crumb) => `${crumb.text}:${crumb.path ?? ''}`).join('|'));

function openCrumb(path: string) {
  void router.push(path);
}

const user = ref<UserInfo>();

function onLogoutClick() {
  auth.logOut();
  router.push({ path: '/sign-in', query: { redirect: route.path } });
}
</script>
<style scoped lang="scss">
@use "@/variables" as *;


header {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 0 4px rgba(0, 0, 0, 0.15);
  padding: var(--header-toolbar-vertical-padding) 0;
  background-color: var(--base-bg);

  .header-toolbar {
    padding-right: var(--content-padding);

    :deep(.global-search-box){
      padding-right: 11px;
    }

    .messages {
      position: relative;

      .dx-badge {
        position: absolute;
        background-color: red;
        color: white;
        right: -10%;
        top: -10%;
        font-size: 12px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        justify-content: center;
      }
    }

    :deep(.dx-toolbar-item.header-breadcrumbs) {
      max-width: 70%;
      min-width: 0;
      overflow: hidden;
    }

    :deep(.dx-toolbar-item.menu-button) {
      width: var(--side-panel-min-width);
      text-align: center;
      padding: 0;
    }
  }
}
</style>
