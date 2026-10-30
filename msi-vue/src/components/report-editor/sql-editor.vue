<template>
  <div class="sql-editor">
    <div
      ref="hostEl"
      class="sql-editor__surface"
    />
    <div
      v-if="error"
      class="sql-editor__error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  SQL_KEYWORDS,
  bracketName,
  completionContext,
  fetchColumns,
  fetchTables,
  parseAliases,
} from '@/utils/sql-completion';

// Monaco подключается через AMD-loader, как на боевом фронте
// (index.php: <script src="./monaco/vs/loader.js">). Файлы лежат в public/monaco/vs.
declare const require: any;
declare const monaco: any;

const props = defineProps<{
  modelValue: string,
  language?: string,
  height?: number,
  readonly?: boolean,
  /** Подключение для подсказок: алиас. → колонки, FROM → таблицы. */
  dbName?: string,
}>();

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const hostEl = ref<HTMLElement | null>(null);
const error = ref('');
let editor: any = null;
let syncing = false;
let resizeObserver: ResizeObserver | null = null;
let themeObserver: MutationObserver | null = null;
let completionProvider: any = null;

/**
 * Пересчёт размеров Monaco.
 *
 * Живёт на верхнем уровне setup: функцию используют и создание редактора,
 * и `defineExpose` (пересчёт при показе/раскрытии панели). Внутри
 * `createEditor` она была не видна наружу — страница «Запросы» падала
 * с `relayout is not defined`.
 */
function relayout() {
  try {
    const el = hostEl.value;
    if (!el || !editor) return;
    editor.layout({ width: el.clientWidth, height: el.clientHeight });
  } catch { /* редактор уже снят */ }
}

/** Тема приложения: класс theme-dark на <html> или localStorage['app-theme']. */
function currentMonacoTheme(): string {
  const dark = document.documentElement.classList.contains('theme-dark')
    || localStorage.getItem('app-theme') === 'dark';
  return dark ? 'vs-dark' : 'vs';
}

function ensureLoader(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof require === 'undefined') {
      reject(new Error('monaco loader не подключён: нет скрипта /monaco/vs/loader.js'));
      return;
    }
    // Приложение может жить под базой (/gr/), поэтому путь берём из BASE_URL.
    const base = (import.meta as any).env?.BASE_URL || '/';
    // nls — русская локализация Monaco (контекстное меню, подсказки).
    require.config({
      paths: { vs: `${base}monaco/vs` },
      'vs/nls': { availableLanguages: { '*': 'ru' } },
    });
    require(['vs/editor/editor.main'], () => resolve(), (e: unknown) => reject(e));
  });
}

// ─── Подсказки SQL: алиас → колонки, схема → таблицы, ключевые слова ─────────

function toCompletionItem(label: string, kind: number, detail: string, insert: string,
  word: { startColumn: number; endColumn: number }, line: number): Record<string, unknown> {
  return {
    label,
    kind,
    detail,
    insertText: insert,
    insertTextRules: 0,
    range: {
      startLineNumber: line,
      endLineNumber: line,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    },
  };
}

async function provideCompletionItems(model: any, position: any) {
  const text = model.getValue();
  const line = position.lineNumber;
  const until = model.getOffsetAt(position);
  const before = text.slice(0, until);
  const word = model.getWordUntilPosition(position);
  const lineTextBefore = before.split('\n').pop() || '';

  // Диапазон заменяемого слова: если курсор после точки — берём хвост после неё.
  const dotCtx = completionContext(lineTextBefore).dot;
  const startColumn = dotCtx
    ? position.column - dotCtx.typed.length
    : Math.max(word.startColumn, 1);
  const wordRange = { startColumn, endColumn: position.column };

  const Kind = monaco.languages.CompletionItemKind;

  // «алиас.» и «схема.» — подсказки по базе подключения.
  if (dotCtx) {
    const dbName = String(props.dbName || '');
    if (dbName) {
      const aliases = parseAliases(text);
      const alias = aliases.find((a) => a.alias === dotCtx.prefix.toLowerCase());
      if (alias) {
        const columns = await fetchColumns(dbName, alias.schema, alias.table);
        return {
          suggestions: columns.map((column) => toCompletionItem(
            column, Kind.Field, `${alias.schema ? `${alias.schema}.` : ''}${alias.table}`,
            column, wordRange, line,
          )),
        };
      }

      const tables = await fetchTables(dbName);
      const schemaTables = tables.filter((t) => t.schema.toLowerCase() === dotCtx.prefix.toLowerCase());
      if (schemaTables.length) {
        return {
          suggestions: schemaTables.map((t) => toCompletionItem(
            t.name, Kind.Class, t.schema, bracketName(t.name), wordRange, line,
          )),
        };
      }

      // Префикс — имя таблицы без алиаса (FROM stack.[X] … stack.[X].): колонки.
      const byName = tables.filter((t) => t.name.toLowerCase() === dotCtx.prefix.toLowerCase());
      if (byName.length) {
        const columns = await fetchColumns(dbName, byName[0].schema, byName[0].name);
        return {
          suggestions: columns.map((column) => toCompletionItem(
            column, Kind.Field, `${byName[0].schema}.${byName[0].name}`,
            column, wordRange, line,
          )),
        };
      }
    }
    return { suggestions: [] };
  }

  // Общий список: ключевые слова + таблицы + алиасы.
  const dbName = String(props.dbName || '');
  const suggestions = SQL_KEYWORDS.map((keyword) => toCompletionItem(
    keyword, Kind.Keyword, 'T-SQL', keyword, wordRange, line,
  ));

  if (dbName) {
    const tables = await fetchTables(dbName);
    for (const table of tables) {
      suggestions.push(toCompletionItem(
        `${table.schema}.${table.name}`, Kind.Class, 'таблица',
        `${bracketName(table.schema)}.${bracketName(table.name)}`, wordRange, line,
      ));
    }
  }

  for (const alias of parseAliases(text)) {
    suggestions.push(toCompletionItem(
      alias.alias, Kind.Variable,
      `алиас ${alias.schema ? `${alias.schema}.` : ''}${alias.table}`,
      alias.alias, wordRange, line,
    ));
  }

  return { suggestions };
}

function registerCompletion() {
  if ((props.language || 'sql') !== 'sql') return;
  try {
    completionProvider = monaco.languages.registerCompletionItemProvider('sql', {
      triggerCharacters: ['.', ' '],
      provideCompletionItems,
    });
  } catch { /* monaco ещё не готов — подсказки просто не появятся */ }
}

async function createEditor() {
  if (!hostEl.value) return;
  try {
    await ensureLoader();
  } catch (e) {
    error.value = (e as Error).message || 'не удалось загрузить Monaco';
    return;
  }
  editor = monaco.editor.create(hostEl.value, {
    value: props.modelValue || '',
    language: props.language || 'sql',
    readOnly: props.readonly === true,
    automaticLayout: true,
    // Как в боевом редакторе: миникарта справа и зум шрифта Ctrl+колесом.
    minimap: { enabled: true, scale: 1, showSlider: 'mouseover' },
    mouseWheelZoom: true,
    fontSize: 13,
    tabSize: 4,
    lineNumbers: 'on',
    wordWrap: 'off',
    scrollBeyondLastLine: false,
    scrollbar: { vertical: 'visible', horizontal: 'visible' },
  });
  try {
    monaco.editor.setTheme(currentMonacoTheme());
  } catch { /* тема применится позже */ }
  if (typeof MutationObserver !== 'undefined') {
    themeObserver = new MutationObserver(() => {
      try {
        monaco.editor.setTheme(currentMonacoTheme());
      } catch { /* ignore */ }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  registerCompletion();

  editor.onDidChangeModelContent(() => {
    if (syncing) return;
    emit('update:modelValue', editor.getValue());
  });

  // Ctrl+колесо — зум шрифта редактора, а не страницы: глотаем событие браузера.
  hostEl.value.addEventListener('wheel', (e: WheelEvent) => {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });

  if (props.height) hostEl.value.style.height = `${props.height}px`;
  // Контейнер может получить размеры после создания (aside/сетка), из-за чего
  // Monaco рисует пустое полотно: принудительный layout после кадра.
  requestAnimationFrame(relayout);
  setTimeout(relayout, 120);

  // Пересчёт при любом изменении размеров панели.
  if (typeof ResizeObserver !== 'undefined' && hostEl.value) {
    resizeObserver = new ResizeObserver(() => relayout());
    resizeObserver.observe(hostEl.value);
  }
}

/** Вставка placeholder'а в позицию курсора: {ИМЯ}, {ИМЯ_start}, {ИМЯ_end}. */
function insertPlaceholder(text: string) {
  if (!editor) return;
  const selection = editor.getSelection();
  editor.executeEdits('insert-placeholder', [{
    range: selection,
    text,
    forceMoveMarkers: true,
  }]);
  editor.focus();
}

function setValue(text: string) {
  if (!editor) return;
  syncing = true;
  try {
    editor.setValue(text || '');
    editor.layout?.();
  } finally {
    syncing = false;
  }
}

defineExpose({ insertPlaceholder, setValue, relayoutEditor: relayout });

onMounted(() => {
  void createEditor();
});

watch(() => props.height, (h) => {
  if (!h) return;
  if (hostEl.value) hostEl.value.style.height = `${h}px`;
  try { editor?.layout?.(); } catch { /* редактор снят */ }
});

watch(() => props.modelValue, (value) => {
  if (!editor) return;
  if (editor.getValue() === value) return;
  syncing = true;
  try {
    editor.setValue(value || '');
    editor.layout?.();
  } finally {
    syncing = false;
  }
});

onBeforeUnmount(() => {
  try {
    resizeObserver?.disconnect?.();
    resizeObserver = null;
    themeObserver?.disconnect?.();
    themeObserver = null;
    completionProvider?.dispose?.();
    completionProvider = null;
  } catch { /* нет наблюдателей */ }
  try {
    editor?.dispose?.();
  } catch { /* редактор уже снят */ }
  editor = null;
});
</script>

<style scoped>
.sql-editor {
  position: relative;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.sql-editor__surface {
  width: 100%;
  height: 320px;
}

.sql-editor__error {
  padding: 8px 12px;
  color: #c62828;
  font-size: 13px;
}
</style>
