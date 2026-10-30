import { createRouter, createWebHashHistory } from 'vue-router';
import defaultLayout from '@/layouts/side-nav-outer-toolbar.vue';
import simpleLayout from '@/layouts/single-card.vue';
import { authInfo, fetchMe, isAdmin } from '@/auth';

// Page components are loaded lazily (dynamic import) to avoid a circular
// dependency between this router module and the pages/components that import
// the router instance (`import { router } from '@/router'`). Eager static
// imports closed a cycle router -> page -> component -> router, which tripped
// a TDZ error under Vite's native-ESM dev server:
//   "Cannot access 'CrmContactList' before initialization".
// Lazy loading also gives us route-level code splitting for free.
function loadAuthComponent(ComponentFileName: string) {
   
  return () => import (/* webpackChunkName: "auth" */ `@/components/library/${ComponentFileName}.vue`);
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/reports',
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign In',
      },
      props: { resetLink: '/reset-password', createAccountLink: '/register' },
      component: loadAuthComponent('login-form'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      props: { signInLink: '/sign-in', buttonLink: '/sign-in' },
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Reset Password',
        description: 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.',
      },
      component: loadAuthComponent('reset-password-form'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Register',
      },
      props: { redirectLink: '/sign-in', buttonLink: '/sign-in' },
      component: loadAuthComponent('create-account-form'),
    },
    {
      path: '/change-password/:recoveryCode',
      name: 'change-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Change Password',
      },
      component: loadAuthComponent('change-password-form'),
    },
    ...[
      { from: '/create-account', to: '/register' },
      { from: '/login', to: '/sign-in' },
    ].map((redirect) => ({ path: redirect.from, redirect: redirect.to })),
    ...[
      { name: 'sign-in-form', component: () => import('@/pages/sign-in-form.vue') },
      { name: 'register-form', component: () => import('@/pages/register-form.vue') },
      { name: 'reset-password-form', component: () => import('@/pages/reset-password-form.vue') },
      { name: 'user-profile', component: () => import('@/pages/user-profile.vue') },
      { name: 'dashboard-online', component: () => import('@/pages/dashboard-online.vue') },
      { name: 'dashboard-updated', component: () => import('@/pages/dashboard-updated.vue') },
      { name: 'stats-branches', component: () => import('@/pages/stats-branches.vue') },
    ].map(({ name, component }) => ({
      path: `/${name}`,
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component,
    })),
    {
      path: '/report/:key',
      name: 'report-view',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/report-view.vue'),
    },
    {
      path: '/admin/filters',
      name: 'filters-admin',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/filters-admin.vue'),
    },
    {
      path: '/admin/wizard',
      name: 'report-wizard',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/report-wizard.vue'),
    },
    {
      path: '/admin/queries',
      name: 'queries-admin',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/queries-admin.vue'),
    },
    {
      path: '/admin/bundles',
      name: 'bundles-admin',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/bundles-admin.vue'),
    },
    {
      path: '/admin/reports',
      name: 'report-tree-editor',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/report-tree-editor.vue'),
    },
    {
      path: '/admin/reports-new',
      name: 'report-tree-editor-new',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/report-tree-editor-new.vue'),
    },
    {
      path: '/report-editor/:key?',
      name: 'report-editor',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/report-editor.vue'),
    },
    {
      path: '/reports',
      name: 'reports-home',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/reports-home.vue'),
    },
    {
      path: '/reports/:sectionKey',
      name: 'reports-section',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: () => import('@/pages/reports-home.vue'),
    },
    ...[
      { from: '/sign-up-form', to: '/register-form' },
      // «Отчёты и фильтры» объединены со «Деревом отчётов» в одну страницу.
      { from: '/reports-admin', to: '/admin/reports' },
    ].map((redirect) => ({ path: redirect.from, redirect: redirect.to })),
  ],
});

/** Маршруты только для админов и выше (superadmin). */
const ADMIN_ROUTES = new Set([
  'filters-admin', 'queries-admin', 'report-tree-editor', 'report-tree-editor-new',
  'report-wizard', 'report-editor', 'bundles-admin',
]);

let meLoaded = false;

router.beforeEach(async (to, from, next) => {
  // Роль и филиал грузятся один раз — до первой проверки прав.
  if (!meLoaded) {
    await fetchMe();
    meLoaded = true;
  }

  // Already signed-in users do not need the sign-in page.
  if (to.name === 'sign-in' && authInfo.loggedIn()) {
    next('/');
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authInfo.loggedIn()) {
      next({
        name: 'sign-in',
        query: { redirect: to.fullPath },
      });
      return;
    }
    if (ADMIN_ROUTES.has(String(to.name)) && !isAdmin()) {
      next({ path: '/reports' });
      return;
    }
  }
  next();
});
