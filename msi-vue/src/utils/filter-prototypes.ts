/**
 * Библиотека прототипов фильтров «Контура данных».
 *
 * Источник истины — боевой класс FormItemBuilder
 * (msi-js/module/FormItemBuilder.js). Прототип описывает только те свойства,
 * которые класс действительно передаёт в виджет.
 *
 * Свойства, объявленные в каталоге, но не читаемые FormItemBuilder
 * (`var`, `formColIndex`, `location`, `locateInMenu`, `showInForm`, `width`),
 * сюда сознательно не включены: иначе редактор показывал бы ручки, которые
 * ничего не меняют. Ширина полей задаётся `formColSpan`, раскладку формы
 * задаёт сама форма.
 */

export type FilterValueKind = 'scalar' | 'array' | 'range' | 'months' | 'numberRange';

export type FilterPropKind =
  | 'text' | 'number' | 'flag' | 'select' | 'items' | 'json' | 'tokens' | 'sql' | 'date';

export type FilterPropGroup = 'main' | 'data' | 'layout' | 'search' | 'format';

/** Группа в списке типов: даты, справочники, прочее. */
export type FilterGroup = 'range' | 'list' | 'other';

export const FILTER_GROUP_TITLES: Record<FilterGroup, string> = {
  range: 'Диапазон',
  list: 'Список',
  other: 'Прочее',
};

export interface FilterPropOption {
  value: string;
  label: string;
}

export interface FilterProp {
  /** Имя свойства в конфигурации фильтра. */
  name: string;
  label: string;
  kind: FilterPropKind;
  group: FilterPropGroup;
  /** Значение по умолчанию — как в FormItemBuilder. */
  default?: unknown;
  options?: FilterPropOption[];
  hint?: string;
  required?: boolean;
}

export interface FilterPrototype {
  /** Значение `type` в конфигурации фильтра. */
  code: string;
  title: string;
  /** Группа в списке типов. */
  group: FilterGroup;
  /** Тип поддержан ради совместимости: в списке новых фильтров не показывается. */
  legacy?: boolean;
  /** Что создаёт FormItemBuilder: класс виджета и обвязка. */
  widget: string;
  /** Форма значения, которую ждёт плейсхолдер. */
  valueKind: FilterValueKind;
  /** Плейсхолдеры SQL для этого типа. `{field}` подставляется в редакторе. */
  placeholders: string[];
  /** Специфичные свойства; общие лежат в COMMON_FILTER_PROPS. */
  props: FilterProp[];
  /** Общие свойства, которые этот тип не читает — в карточке не показываем. */
  omit?: string[];
  /**
   * Свойства каталога, которые для этого типа игнорируются.
   * Пример: `showClearButton` у hierarchical-list — в коде жёстко `false`.
   */
  ignoredProps?: string[];
  /** Рабочий пример — предпросмотр и тесты. */
  example: Record<string, unknown>;
}

const LABEL_MODES: FilterPropOption[] = [
  { value: 'static', label: 'Над полем' },
  { value: 'floating', label: 'Внутри поля' },
  { value: 'hidden', label: 'Скрыта' },
];

/**
 * Источник элементов списка.
 *
 * `months` и `databases` не требуют SQL: месяцы строятся по календарю,
 * подключения — из переменных DB1UL…DB9FL окружения служб.
 */
const ITEMS_KIND_OPTIONS: FilterPropOption[] = [
  { value: 'list', label: 'Перечисления' },
  { value: 'query', label: 'SQL запрос' },
  { value: 'months', label: 'Функция заполнения' },
  { value: 'databases-ul', label: 'Подключения env ЮЛ' },
  { value: 'databases-fl', label: 'Подключения env ФЛ' },
  { value: 'databases', label: 'Подключения из env (все)' },
];

const DB_SUFFIX_OPTIONS: FilterPropOption[] = [
  { value: 'UL', label: 'ЮЛ' },
  { value: 'FL', label: 'ФЛ' },
];

const ITEMS_KIND_PROP: FilterProp = {
  name: 'itemsKind',
  label: 'Источник элементов',
  kind: 'select',
  group: 'data',
  default: 'query',
  options: ITEMS_KIND_OPTIONS,
  hint: 'Перечисления — грид id/name; SQL запрос — itemsQuery; функция — автозаполнение (месяцы); подключения — базы из env',
};

/** Свойства, которые читает любой тип: общая часть формы фильтра. */
export const COMMON_FILTER_PROPS: FilterProp[] = [
  {
    name: 'field',
    label: 'Ключ поля',
    kind: 'text',
    group: 'main',
    required: true,
    hint: 'Имя плейсхолдера в SQL: {ключ}',
  },
  { name: 'label', label: 'Наименование', kind: 'text', group: 'main' },
  {
    name: 'placeholder',
    label: 'Приглашение',
    kind: 'text',
    group: 'main',
    hint: 'Текст в незаполненном поле; для части типов он же становится подписью',
  },
  {
    name: 'labelMode',
    label: 'Режим подписи',
    kind: 'select',
    group: 'main',
    default: 'static',
    options: LABEL_MODES,
  },
  {
    name: 'preload',
    label: 'Предзагружать справочник',
    kind: 'flag',
    group: 'main',
    default: false,
    hint: 'Нужны itemsQuery и dbName: дерево грузится до открытия формы',
  },
  {
    name: 'dynamicDefault',
    label: 'Значение по умолчанию от даты',
    kind: 'flag',
    group: 'data',
    default: false,
    hint: 'Для диапазонов — прошлый месяц или начало месяца; для списков — месяцы текущего и прошлого года',
  },
  {
    name: 'var',
    label: 'Плейсхолдеры (var)',
    kind: 'tokens',
    group: 'main',
    hint: 'Имена без скобок: ПериодДни_start, ПериодДни_end. Именно они предлагаются в SQL.',
  },
  { name: 'formOrder', label: 'Порядок в форме', kind: 'number', group: 'layout', default: 999 },
  {
    name: 'formColSpan',
    label: 'Ширина (колонок формы)',
    kind: 'number',
    group: 'layout',
    default: 2,
    hint: '1 или 2: сколько колонок занимает поле',
  },
];

const FORMULA_NOTE = 'Строка — значения через запятую; элементы фильтра — id';

export const FILTER_PROTOTYPES: FilterPrototype[] = [
  {
    code: 'hierarchical-list',
    title: 'Список (иерархия по уровням) · устаревший',
    group: 'list',
        legacy: true,
    omit: ['dynamicDefault'],
    widget: 'dxDropDownBox + дерево (FullTreeList)',
    valueKind: 'array',
    placeholders: ['{field}'],
    ignoredProps: ['showClearButton'],
    props: [
      {
        name: 'dbName',
        label: 'База данных',
        kind: 'text',
        group: 'main',
        required: true,
        hint: 'Ключ подключения: DB1UL, DB1FL, DB2FL…',
      },
      {
        name: 'itemsQuery',
        label: 'SQL справочника',
        kind: 'sql',
        group: 'data',
        hint: 'Необязателен: без него дерево грузится по dbName',
      },
      { name: 'height', label: 'Высота выпадающего дерева', kind: 'text', group: 'layout', default: '400px' },
      {
        name: 'searchEnabled',
        label: 'Строка поиска',
        kind: 'flag',
        group: 'search',
        default: true,
        hint: 'filterRow + панель фильтра + headerFilter, как в боевом FullTreeList; ищет по загруженным узлам',
      },
    ],
    example: {
      type: 'hierarchical-list',
      field: 'БД',
      label: 'Фонд по уровням',
      placeholder: 'Выберите фонд',
      dbName: 'DB1FL',
      height: '60vh',
      formOrder: 1,
      formColSpan: 2,
      labelMode: 'static',
    },
  },
  {
    code: 'hr-fond',
    title: 'Список (иерархия)',
    group: 'list',
    omit: ['dynamicDefault'],
    widget: 'dxDropDownBox + FondTreeList',
    valueKind: 'array',
    placeholders: ['{field}'],
    props: [
      { name: 'dbName', label: 'База данных', kind: 'text', group: 'main', required: true },
      {
        name: 'itemsQuery',
        label: 'SQL справочника',
        kind: 'sql',
        group: 'data',
        required: true,
        hint: 'Без него FormItemBuilder возвращает null и пишет ошибку в консоль',
      },
      { name: 'showClearButton', label: 'Кнопка очистки', kind: 'flag', group: 'main', default: true },
      { name: 'height', label: 'Высота выпадающего дерева', kind: 'text', group: 'layout', default: '400px' },
      {
        name: 'searchEnabled',
        label: 'Строка поиска',
        kind: 'flag',
        group: 'search',
        default: true,
        hint: 'filterRow + панель фильтра + headerFilter (боевой вид); для ленивого дерева ищет по загруженным узлам',
      },
    ],
    example: {
      type: 'hr-fond',
      field: 'ФОНД',
      label: 'Фонд',
      placeholder: 'Выберите фонд',
      dbName: 'DB1UL',
      itemsQuery: 'SELECT ...',
      formOrder: 2,
      formColSpan: 2,
      showClearButton: true,
    },
  },
  {
    code: 'dateRange',
    title: 'Диапазон дат (календарь)',
    group: 'range',
    omit: ['preload'],
    widget: 'dxDateRangeBox',
    valueKind: 'range',
    placeholders: ['{field}', '{field}_start', '{field}_end', '{field}_start_num', '{field}_end_num'],
    props: [
      {
        name: 'applyValueMode',
        label: 'Применение значения',
        kind: 'select',
        group: 'main',
        default: 'instantly',
        options: [
          { value: 'instantly', label: 'Сразу' },
          { value: 'useButtons', label: 'По кнопке «ОК»' },
        ],
      },
      { name: 'displayFormat', label: 'Формат отображения', kind: 'text', group: 'format', default: 'dd.MM.yyyy' },
      {
        name: 'minDate',
        label: 'Минимальная дата',
        kind: 'date',
        group: 'data',
        hint: 'Если задано — приоритет над автоматическими границами',
      },
      {
        name: 'maxDate',
        label: 'Максимальная дата',
        kind: 'date',
        group: 'data',
        hint: 'Если задано — приоритет над автоматическими границами',
      },
      { name: 'firstDayOfWeek', label: 'Первый день недели', kind: 'number', group: 'layout', default: 1 },
      {
        name: 'calendarZoomLevel',
        label: 'Масштаб календаря',
        kind: 'select',
        group: 'layout',
        default: 'month',
        options: [
          { value: 'month', label: 'Месяц' },
          { value: 'year', label: 'Год' },
          { value: 'decade', label: 'Десятилетие' },
          { value: 'century', label: 'Век' },
        ],
      },
      { name: 'calendarOptions', label: 'Опции календаря', kind: 'json', group: 'layout' },
    ],
    example: {
      type: 'dateRange',
      field: 'ПериодДни',
      label: 'Период, дни',
      placeholder: 'Выберите период',
      formOrder: 3,
      formColSpan: 2,
      displayFormat: 'dd.MM.yyyy',
      dynamicDefault: true,
    },
  },
  {
    code: 'select',
    title: 'Список (одно значение) · устаревший',
    group: 'list',
        legacy: true,
    omit: ['preload'],
    widget: 'dxSelectBox',
    valueKind: 'scalar',
    placeholders: ['{field}'],
    props: [
      {
        name: 'items',
        label: 'Элементы списка',
        kind: 'items',
        group: 'data',
        hint: 'Массив { id, name }; пустой массив при dynamicDefault заполняется 24 месяцами',
      },
    ],
    example: {
      type: 'select',
      field: 'РасчетыйМесяц',
      label: 'Расчётный месяц',
      placeholder: 'Укажите расчётный месяц',
      formOrder: 3,
      formColSpan: 1,
      dynamicDefault: true,
      items: [],
    },
  },
  {
    code: 'multi-select',
    title: 'Список (подключения) · устаревший',
    group: 'list',
        legacy: true,
    omit: ['preload', 'dynamicDefault'],
    widget: 'dxTagBox',
    valueKind: 'array',
    placeholders: ['{field}'],
    props: [
      ITEMS_KIND_PROP,
      {
        name: 'items',
        label: 'Элементы списка',
        kind: 'items',
        group: 'data',
        hint: 'Снимок для старой оболочки; при itemsKind: databases пересобирается из env',
      },
      {
        name: 'dbName',
        label: 'База по умолчанию',
        kind: 'text',
        group: 'main',
        hint: 'Виджет её не использует: значение нужно запуску отчёта для выбора подключений',
      },
      { name: 'multiline', label: 'Многострочный', kind: 'flag', group: 'layout', default: false },
      {
        name: 'showSelectionControls',
        label: 'Чекбоксы в списке',
        kind: 'flag',
        group: 'main',
        default: true,
      },
    ],
    example: {
      type: 'multi-select',
      field: 'БД_ЮЛ',
      label: 'Подключения ЮЛ',
      placeholder: 'Укажите подключения ЮЛ',
      formOrder: 5,
      formColSpan: 2,
      itemsKind: 'databases',
      dbSuffix: 'UL',
      showSelectionControls: true,
      items: [],
    },
  },
  {
    code: 'multi-select-fl',
    title: 'Список (подключения ФЛ)',
    group: 'list',
    omit: ['preload', 'dynamicDefault'],
    widget: 'dxTagBox',
    valueKind: 'array',
    placeholders: ['{field}'],
    props: [
      ITEMS_KIND_PROP,
      {
        name: 'items',
        label: 'Элементы списка',
        kind: 'items',
        group: 'data',
        hint: 'Снимок для старой оболочки; при itemsKind: databases пересобирается из env',
      },
      {
        name: 'dbName',
        label: 'База по умолчанию',
        kind: 'text',
        group: 'main',
        hint: 'Виджет её не использует: значение нужно запуску отчёта для выбора подключений',
      },
      { name: 'multiline', label: 'Многострочный', kind: 'flag', group: 'layout', default: false },
      { name: 'showSelectionControls', label: 'Чекбоксы в списке', kind: 'flag', group: 'main', default: true },
    ],
    example: {
      type: 'multi-select-fl',
      field: 'БД_ФЛ',
      label: 'Подключения ФЛ',
      placeholder: 'Укажите подключения ФЛ',
      itemsKind: 'databases-fl',
      formOrder: 6,
      formColSpan: 2,
      items: [],
    },
  },
  {
    code: 'multi-select-list',
    title: 'Список (поиск, чекбокс)',
    group: 'list',
    // items живёт в каталоге, но редактируется гридом id/name (не в форме)
    ignoredProps: ['items'],
    widget: 'dxDropDownBox + dxList',
    valueKind: 'array',
    placeholders: ['{field}'],
    props: [
      ITEMS_KIND_PROP,
      // items редактируется гридом id/name в секции «Данные» (не JSON-полем)
      { name: 'dbName', label: 'База данных', kind: 'text', group: 'main', hint: 'Нужна вместе с itemsQuery' },
      { name: 'itemsQuery', label: 'SQL списка', kind: 'sql', group: 'data', hint: 'Серверный источник элементов' },
      {
        name: 'multiple',
        label: 'Множественный выбор (чекбоксы)',
        kind: 'flag',
        group: 'main',
        default: true,
        hint: 'Снять — одиночный выбор без чекбоксов (бывший «Список (одно значение)»)',
      },
      { name: 'showClearButton', label: 'Кнопка очистки', kind: 'flag', group: 'main', default: true },
      { name: 'showSelectionControls', label: 'Чекбоксы в списке', kind: 'flag', group: 'main', default: true },
      {
        name: 'selectAllMode',
        label: 'Режим «выбрать всё»',
        kind: 'select',
        group: 'main',
        default: 'allPages',
        options: [
          { value: 'allPages', label: 'Все страницы' },
          { value: 'page', label: 'Текущая страница' },
        ],
      },
      { name: 'searchEnabled', label: 'Поиск', kind: 'flag', group: 'search', default: true },
      { name: 'searchExpr', label: 'Поля поиска', kind: 'json', group: 'search', hint: 'Массив: ["name"]' },
      {
        name: 'searchMode',
        label: 'Режим поиска',
        kind: 'select',
        group: 'search',
        default: 'contains',
        options: [
          { value: 'contains', label: 'Содержит' },
          { value: 'startswith', label: 'Начинается с' },
          { value: 'equals', label: 'Совпадает' },
        ],
      },
      { name: 'searchTimeout', label: 'Задержка поиска, мс', kind: 'number', group: 'search', default: 500 },
      { name: 'searchPlaceholder', label: 'Placeholder поиска', kind: 'text', group: 'search', default: 'Поиск...' },
      {
        name: 'pageLoadMode',
        label: 'Загрузка страниц',
        kind: 'select',
        group: 'layout',
        default: 'scrollBottom',
        options: [
          { value: 'scrollBottom', label: 'Прокруткой' },
          { value: 'nextButton', label: 'Кнопкой' },
        ],
      },
      {
        name: 'showScrollbar',
        label: 'Полоса прокрутки',
        kind: 'select',
        group: 'layout',
        default: 'onHover',
        options: [
          { value: 'onHover', label: 'При наведении' },
          { value: 'always', label: 'Всегда' },
          { value: 'never', label: 'Скрыта' },
        ],
      },
    ],
    example: {
      type: 'multi-select-list',
      field: 'РасчетыеМесяцы',
      label: 'Расчётные месяцы',
      placeholder: 'Укажите расчётные месяцы',
      // Новый список по умолчанию берёт элементы из SQL; months — особый
      // случай существующего фильтра, не дефолт прототипа.
      formOrder: 6,
      formColSpan: 2,
      showClearButton: true,
      showSelectionControls: true,
      pageLoadMode: 'scrollBottom',
      showScrollbar: 'onHover',
      dynamicDefault: true,
      items: [],
    },
  },
  {
    code: 'button-group',
    title: 'Переключатель кнопками · устаревший',
    group: 'other',
    legacy: true,
    omit: ['preload', 'dynamicDefault', 'labelMode'],
    widget: 'dxButtonGroup',
    valueKind: 'scalar',
    placeholders: ['{field}'],
    props: [
      {
        name: 'items',
        label: 'Кнопки',
        kind: 'items',
        group: 'data',
        required: true,
        hint: 'Массив { id, text } — ключ и подпись кнопки',
      },
      { name: 'multiple', label: 'Множественный выбор', kind: 'flag', group: 'main', default: false },
    ],
    example: {
      type: 'button-group',
      field: 'Формат',
      label: 'Формат',
      placeholder: 'Формат вывода',
      formOrder: 7,
      formColSpan: 2,
      multiple: false,
      items: [
        { id: 'sum', text: 'Сумма' },
        { id: 'count', text: 'Количество' },
      ],
    },
  },
  {
    code: 'dateRangeMonths',
    title: 'Диапазон месяцев (календарь)',
    group: 'range',
    omit: ['preload'],
    widget: 'dxDateRangeBox (calendarView: month)',
    valueKind: 'months',
    placeholders: ['{field}', '{field}_start', '{field}_end', '{field}_start_num', '{field}_end_num'],
    props: [
      { name: 'displayFormat', label: 'Формат отображения', kind: 'text', group: 'format', default: 'MMM yyyy' },
      {
        name: 'pickerType',
        label: 'Тип выбора',
        kind: 'select',
        group: 'main',
        default: 'calendar',
        options: [
          { value: 'calendar', label: 'Календарь' },
          { value: 'list', label: 'Список' },
        ],
      },
      {
        name: 'minDate',
        label: 'Минимум (месяц)',
        kind: 'date',
        group: 'data',
        hint: 'Пишется в calendarOptions.min и главнее автограниц',
      },
      {
        name: 'maxDate',
        label: 'Максимум (месяц)',
        kind: 'date',
        group: 'data',
        hint: 'Пишется в calendarOptions.max',
      },
      { name: 'calendarOptions', label: 'Опции календаря', kind: 'json', group: 'layout', hint: 'zoomLevel, calendarView…' },
    ],
    example: {
      type: 'dateRangeMonths',
      field: 'ПериодМесяцы',
      label: 'Период, месяцы',
      placeholder: 'Выберите период',
      formOrder: 4,
      formColSpan: 2,
      displayFormat: 'MMM yyyy',
      pickerType: 'calendar',
      dynamicDefault: true,
    },
  },
  {
    code: 'range-months',
    title: 'Диапазон месяцев (шкала)',
    group: 'range',
    omit: ['preload'],
    widget: 'MSI.viz.dxRangeSelector',
    valueKind: 'months',
    placeholders: ['{field}_start', '{field}_end'],
    props: [
      { name: 'height', label: 'Высота шкалы', kind: 'number', group: 'layout', default: 65 },
      { name: 'maxRange', label: 'Максимальный диапазон', kind: 'json', group: 'data', hint: 'Например: { months: 12 }' },
      {
        name: 'minDate',
        label: 'Начало шкалы',
        kind: 'date',
        group: 'data',
        hint: 'Без него шкала начинается с 1 января прошлого года',
      },
      {
        name: 'maxDate',
        label: 'Конец шкалы',
        kind: 'date',
        group: 'data',
        hint: 'Без него шкала заканчивается текущим месяцем',
      },
    ],
    example: {
      type: 'range-months',
      field: 'Период',
      label: 'Период, месяцы',
      placeholder: 'Выберите период',
      formOrder: 10,
      formColSpan: 2,
      dynamicDefault: true,
      maxRange: { months: 12 },
    },
  },
  {
    code: 'range-days',
    title: 'Диапазон дат (шкала)',
    group: 'range',
    omit: ['preload'],
    widget: 'MSI.viz.dxRangeSelector (дни, 2 ползунка)',
    valueKind: 'range',
    placeholders: ['{field}_start', '{field}_end'],
    props: [
      { name: 'height', label: 'Высота шкалы', kind: 'number', group: 'layout', default: 65 },
      {
        name: 'minDate',
        label: 'Начало шкалы',
        kind: 'date',
        group: 'data',
        hint: 'Без него шкала начинается с 1 января прошлого года',
      },
      {
        name: 'maxDate',
        label: 'Конец шкалы',
        kind: 'date',
        group: 'data',
        hint: 'Без него шкала заканчивается сегодняшним днём',
      },
      {
        name: 'maxRange',
        label: 'Максимальный диапазон',
        kind: 'json',
        group: 'data',
        hint: 'Например: { days: 31 }',
      },
    ],
    example: {
      type: 'range-days',
      field: 'ПериодДни',
      label: 'Период, дни',
      placeholder: 'Выберите период',
      formOrder: 10,
      formColSpan: 2,
      height: 65,
      dynamicDefault: true,
    },
  },
  {
    code: 'range-number',
    title: 'Диапазон значений (шкала)',
    group: 'range',
    omit: ['preload'],
    widget: 'MSI.viz.dxRangeSelector (числа)',
    valueKind: 'numberRange',
    placeholders: ['{field}_start', '{field}_end'],
    props: [
      {
        name: 'min',
        label: 'Минимум шкалы',
        kind: 'number',
        group: 'data',
        required: true,
        hint: 'Левая граница шкалы; в SQL не подставляется',
      },
      {
        name: 'max',
        label: 'Максимум шкалы',
        kind: 'number',
        group: 'data',
        required: true,
        hint: 'Правая граница шкалы; в SQL не подставляется',
      },
      { name: 'step', label: 'Шаг шкалы', kind: 'number', group: 'data', hint: 'Без шага шкала рисует деления автоматически' },
      {
        name: 'precision',
        label: 'Точность (знаков после запятой)',
        kind: 'number',
        group: 'data',
        default: 0,
        hint: '0 — целые значения, 1–6 — дробные: значение форматируется с этой точностью',
      },
      { name: 'height', label: 'Высота шкалы', kind: 'number', group: 'layout', default: 65 },
      { name: 'showRangeLabels', label: 'Подписи границ', kind: 'flag', group: 'layout', default: true },
    ],
    example: {
      type: 'range-number',
      field: 'Сумма',
      label: 'Сумма',
      placeholder: 'Укажите диапазон суммы',
      formOrder: 10,
      formColSpan: 2,
      min: 0,
      max: 100000,
      step: 1000,
      height: 65,
    },
  },
];

/** Свойства каталога, которые FormItemBuilder не читает. */
export const IGNORED_CATALOG_PROPS: string[] = [
  'formColIndex',
  'width',
  'location',
  'locateInMenu',
  'showInForm',
  'onValueChanged',
];

export function filterPrototype(code: string): FilterPrototype | undefined {
  return FILTER_PROTOTYPES.find((p) => p.code === code);
}

/** Все свойства типа: общие + специфичные, без дублей. */
export function filterPrototypeProps(code: string): FilterProp[] {
  const proto = filterPrototype(code);
  if (!proto) return COMMON_FILTER_PROPS;
  const names = new Set(proto.props.map((p) => p.name));
  const omit = new Set(proto.omit ?? []);
  return [
    ...COMMON_FILTER_PROPS.filter((p) => !names.has(p.name) && !omit.has(p.name)),
    ...proto.props,
  ];
}

/** Варианты для dxSelectBox в редакторе фильтров. */
export function filterPrototypeOptions(): Array<{ value: string; label: string }> {
  return FILTER_PROTOTYPES.map((p) => ({ value: p.code, label: p.title }));
}

export { FORMULA_NOTE };
