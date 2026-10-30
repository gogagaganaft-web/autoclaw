<template>
  <form
    class="login-form"
    @submit.prevent="onSubmit"
  >
    <dx-form
      :form-data="formData"
      :disabled="loading"
      :show-colon-after-label="true"
      label-location="top"
    >
      <dx-item
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Email',
          mode: 'email',
          value: 'jheart@dx-email.com',
        }"
      >
        <dx-required-rule message="Email is required" />
        <dx-email-rule message="Email is invalid" />
        <dx-label text="Email" />
      </dx-item>
      <dx-item
        data-field="password"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Password',
          mode: 'password',
          value: 'password',
        }"
      >
        <dx-required-rule message="Password is required" />
        <dx-label text="Password" />
      </dx-item>
      <dx-item
        data-field="rememberMe"
        editor-type="dxCheckBox"
        :editor-options="{ text: 'Remember me', elementAttr: { class: 'form-text' } }"
      >
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        />
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Sign In</span>
          </span>
        </div>
      </template>
    </dx-form>

    <div
      v-if="users.length"
      class="login-users"
    >
      <div class="login-users__hint">
        Войти как (dev, без пароля):
      </div>
      <dx-button
        v-for="u in users"
        :key="u.login"
        class="login-users__btn"
        :text="userLabel(u)"
        styling-mode="outlined"
        @click="onSubmit(u.login)"
      />
    </div>
m>
    <div class="reset-link">
      <router-link :to="props.resetLink">
        Forgot password?
      </router-link>
    </div>
    <dx-button
      text="Register"
      width="100%"
      @click="onCreateAccountClick"
      :styling-mode="buttonStylingMode"
    />
    <login-oauth />
  </form>
</template>

<script setup lang="ts">
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from 'devextreme-vue/form';
import DxButton, { DxButtonTypes } from 'devextreme-vue/button';
import notify from 'devextreme/ui/notify';

import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { refreshNavigation } from '@/composables/use-navigation';
import { authInfo as auth } from '@/auth';
import LoginOauth from '@/components/library/login-oauth.vue';
import { themeService } from '@/theme/theme-service';

const { currentTheme } = themeService;

 
const buttonStylingMode = computed<DxButtonTypes.ButtonStyle>(() => {
  return currentTheme.value === 'dark' ? 'outlined' : 'contained';
});

const props = defineProps<{
  resetLink?: string,
  createAccountLink?: string
}>();

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});
const loading = ref(false);

function onCreateAccountClick() {
  router.push(props.createAccountLink);
}

/** Пользователи каталога app_user: dev-вход без пароля. */
const users = ref<Array<{ login: string; display_name: string; role_code: string; branch_code: string }>>([]);

onMounted(async () => {
  await fetchMe();
  users.value = await fetchUsers();
});

/** Вход: выбранный из каталога либо введённый вручную логин. */
async function onSubmit(login?: string) {
  loading.value = true;
  const who = login ?? formData.email;
  await switchDevUser(who);
  await refreshNavigation();
  window.location.assign('/#/reports');
}

function userLabel(u: { display_name: string; login: string; role_code: string; branch_code: string }): string {
  const role = u.role_code === 'superadmin' ? 'SuperAdmin'
    : u.role_code === 'admin' ? `Admin${u.branch_code ? ` · ф.${u.branch_code}` : ''}`
      : `User${u.branch_code ? ` · ф.${u.branch_code}` : ''}`;
  return `${u.display_name} — ${role}`;
}
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.login-form {
  :deep(.form-text) {
    color: var(--base-text-color-alpha);
  }
}

.reset-link {
  text-align: center;
  font-style: normal;
  margin: 6px 0 50px 0;

  a {
    cursor: pointer;
  }
}
</style>

<style scoped lang="scss">
.login-users {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;

  &__hint {
    font-size: 12px;
    opacity: 0.7;
  }

  &__btn {
    width: 100%;
  }
}
</style>
