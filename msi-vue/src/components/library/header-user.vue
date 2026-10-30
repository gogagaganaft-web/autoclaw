<template>
  <div class="header-user">
    <span
      v-if="roleLabel"
      class="header-user__role"
      title="Роль и филиал текущего пользователя"
    >{{ roleLabel }}</span>
    <dx-drop-down-button
      v-if="devUsers.length"
      class="header-user__switch"
      text="Войти как…"
      icon="user"
      styling-mode="outlined"
      :items="devUsers"
      :display-expr="userLabel"
      key-expr="login"
      :on-item-click="(e: { itemData?: { login?: string } }) => onSwitchUser(String(e.itemData?.login || ''))"
    />
    <user-panel
      :user="user"
      :menu-items="[{ text: 'Logout', icon: 'runner', onClick: onLogoutClick }]"
      menu-mode="context"
    />
  </div>
</template>

<script setup lang="ts">
// Живёт отдельным компонентом: шаблоны dx-toolbar в шиме рендерятся один раз,
// реактивность внутри них не обновляет DOM. Здесь своё дерево — обновляется.

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import UserPanel from '@/components/library/user-panel.vue';
import {
  authInfo, currentUser, fetchMe, fetchUsers, switchDevUser, type UserInfo,
} from '@/auth';

const emit = defineEmits<{ logout: [] }>();

const router = useRouter();
const user = ref<UserInfo | null>(null);
const devUsers = ref<Array<{ login: string; display_name: string; role_code: string; branch_code: string }>>([]);

const roleLabel = computed(() => {
  const me = currentUser.value;
  if (!me) return '';
  const suffix = me.branch ? ` · филиал ${me.branch}` : '';
  if (me.role === 'superadmin') return 'SuperAdmin';
  if (me.role === 'admin') return `Admin${suffix}`;
  return `User${suffix}`;
});

function userLabel(u: { display_name: string; role_code: string; branch_code: string }): string {
  const s = u.branch_code ? ` · ф.${u.branch_code}` : '';
  const role = u.role_code === 'superadmin' ? 'SuperAdmin'
    : u.role_code === 'admin' ? `Admin${s}` : `User${s}`;
  return `${u.display_name} — ${role}`;
}

async function reload(): Promise<void> {
  await fetchMe();
  const { data } = await authInfo.getUser();
  user.value = data as UserInfo | null;
  if (currentUser.value?.isDevAuth) {
    devUsers.value = await fetchUsers();
  }
}

onMounted(() => {
  void reload();
});

async function onSwitchUser(login: string): Promise<void> {
  await switchDevUser(login);
  // assign с тем же URL не перезагружает страницу — нужен полный reload,
  // чтобы router/app-navigation пересобрались под новой ролью.
  window.location.hash = '#/reports';
  window.location.reload();
}

function onLogoutClick(): void {
  emit('logout');
  void authInfo.logOut();
  void router.push({ path: '/sign-in' });
}
</script>

<style scoped lang="scss">
.header-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-user__role {
  font-size: 12px;
  padding: 2px 8px;
  border: 1px solid var(--border-color, rgba(128, 128, 128, 0.4));
  border-radius: 10px;
  opacity: 0.85;
  white-space: nowrap;
}
</style>
