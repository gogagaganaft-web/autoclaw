import { isAdmin, isSuperAdmin } from '@/auth';

export const navigation = [
  {
    text: 'Администрирование',
    icon: 'fieldchooser',
    path: '',
    items: [
      {
        text: 'Дерево отчётов',
        path: '/admin/reports',
      },
      {
        text: 'Дерево отчётов (новое)',
        path: '/admin/reports-new',
      },
      {
        text: 'Фильтры контура',
        path: '/admin/filters',
      },
      {
        text: 'Запросы',
        path: '/admin/queries',
      },
      {
        text: 'Мастер отчётов',
        path: '/admin/wizard',
      },
      {
        text: 'Наборы',
        path: '/admin/bundles',
        /** Наборы каталога — только SuperAdmin. */
        visible: () => isSuperAdmin(),
      },
    ],
    /** Пункты редактирования скрыты для роли user. */
    visible: () => isAdmin(),
  },
  {
    text: 'Дашборды',
    icon: 'datapie',
    path: '',
    items: [
      {
        text: 'Онлайн',
        path: '/dashboard-online',
      },
      {
        text: 'Обновляемые',
        path: '/dashboard-updated',
      },
    ],
  },
  {
    text: 'Статистика',
    icon: 'box',
    path: '',
    items: [
      {
        text: 'По филиалам',
        path: '/stats-branches',
      },
    ],
  },
];
