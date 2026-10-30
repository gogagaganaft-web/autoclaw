# msi-builder — сборка библиотеки MSI (`msi.js`)

Проект собирает единый браузерный бандл `dist/msi.js` (глобальное имя `MSI`)
из модулей библиотеки в `src/` (в отдельные модули).

## Структура

| Путь | Что это |
|------|---------|
| `src/` | Модули библиотеки (1243 шт.) — реальные исходники |
| `entry.js` | Точка входа: регистрирует виджеты, отдаёт корневой объект `MSI` |
| `build.js` | Сборщик на esbuild (IIFE, `globalName: MSI`) |
| `gen-classes.js` | Генерация списка классов → `dist/CLASSES.md` |
| `smoke_test.js` | Проверка собранного бандла в JSDOM |
| `docs/CLASS_MAP.md` | Карта «класс → модуль» |
| `dist/` | Результат: `msi.js`, `CLASSES.md`, `example.html` |

## Сборка

```bash
npm install
npm run build:min     # -> dist/msi.js (минифицированный)
npm run gen:classes   # -> dist/CLASSES.md (список классов и виджетов)
npm run verify        # build:min + gen:classes + smoke-тест
```

## Использование в любом другом проекте

Скопируйте `dist/msi.js` (и, при желании, `dist/CLASSES.md`) и подключите:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="msi.js"></script>
<script>
  $(function () {
    new MSI.ui.dxDataGrid($('#grid'), {
      dataSource: [ { id: 1, name: 'Иван', age: 30 } ],
      columns: ['id', 'name', 'age'],
    });
  });
</script>
```

> ⚠️ Виджеты — это классы: создавайте их через `new MSI.ui.dx…(element, options)`
> либо jQuery-плагином `$('#grid').dxDataGrid(options)`.
> Вызов без `new` бросает ошибку «A class must be instantiated using the 'new' keyword».
